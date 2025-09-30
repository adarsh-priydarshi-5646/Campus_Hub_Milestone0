import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiLogin, apiRegister, apiLogout, apiGetCurrentUser, apiUpdateProfile } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredUser = async () => {
      try {
        const [storedUser, storedToken] = await AsyncStorage.multiGet(['mch_user', 'mch_token']);
        const userValue = storedUser?.[1];
        const tokenValue = storedToken?.[1];
        if (userValue) setUser(JSON.parse(userValue));
        if (tokenValue) global.__MCH_TOKEN__ = tokenValue;
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    loadStoredUser();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await apiLogin(email, password);
      const { token, user: payloadUser } = res.data;
      global.__MCH_TOKEN__ = token;
      await AsyncStorage.multiSet([
        ['mch_user', JSON.stringify(payloadUser)],
        ['mch_token', token],
      ]);
      setUser(payloadUser);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Unable to login. Please try again.';
      return { success: false, error: message };
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const res = await apiRegister(name, email, password);
      const { token, user: payloadUser } = res.data;
      global.__MCH_TOKEN__ = token;
      await AsyncStorage.multiSet([
        ['mch_user', JSON.stringify(payloadUser)],
        ['mch_token', token],
      ]);
      setUser(payloadUser);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Unable to signup. Please try again.';
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (__DEV__) console.log('Logout: Starting logout process...');
      
      try {
        await apiLogout();
        if (__DEV__) console.log('Logout: Session invalidated on server');
      } catch (apiError) {
        if (__DEV__) console.warn('Logout: Failed to invalidate session on server:', apiError.message);
      }
      
      await AsyncStorage.multiRemove(['mch_user', 'mch_token']);
      if (__DEV__) console.log('Logout: AsyncStorage cleared');
      
      global.__MCH_TOKEN__ = undefined;
      if (__DEV__) console.log('Logout: Global token cleared');
      
      setUser(null);
      if (__DEV__) console.log('Logout: User state cleared - should navigate to Welcome');
      
      return true;
    } catch (e) {
      if (__DEV__) console.error('Logout error:', e);
      
      try {
        await AsyncStorage.multiRemove(['mch_user', 'mch_token']);
        global.__MCH_TOKEN__ = undefined;
        setUser(null);
      } catch (clearError) {
        if (__DEV__) console.error('Force logout error:', clearError);
      }
      
      return false;
    }
  }, []);

  const updateUser = useCallback(async (profileData) => {
    try {
      const res = await apiUpdateProfile(profileData);
      const updatedUser = res.data.user;
      
      await AsyncStorage.setItem('mch_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update profile';
      return { success: false, error: message };
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const res = await apiGetCurrentUser();
      const freshUser = res.data.user;
      
      await AsyncStorage.setItem('mch_user', JSON.stringify(freshUser));
      setUser(freshUser);
      
      return { success: true, user: freshUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const value = useMemo(() => ({ 
    user, 
    loading, 
    login, 
    register, 
    logout, 
    updateUser, 
    refreshUser 
  }), [user, loading, login, register, logout, updateUser, refreshUser]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};


