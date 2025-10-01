/**
 * सभी Screens को Responsive बनाने के लिए Quick Fix Template
 * 
 * हर screen में ये changes apply करें:
 */

// ============================================
// 1. IMPORTS में ADD करें
// ============================================
import { globalStyles, colors, typography, spacing, responsiveTypography, isSmallScreen } from '../styles/globalStyles';
import { wp, hp, normalize, rs } from '../utils/responsive';

// ============================================
// 2. STYLES में REPLACE करें
// ============================================

const styles = StyleSheet.create({
  // Container - Full Width
  container: {
    width: '100%',
    flex: 1,
    paddingHorizontal: rs(spacing.lg),
  },
  
  scrollContainer: {
    width: '100%',
    flex: 1,
  },
  
  scrollContent: {
    width: '100%',
    paddingBottom: rs(spacing.xxl),
  },
  
  // Header - Full Width
  header: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
    paddingVertical: rs(spacing.xl),
    marginBottom: rs(spacing.xl),
  },
  
  // Section - Full Width
  section: {
    width: '100%',
    marginBottom: rs(spacing.xl),
  },
  
  // ============================================
  // GRID LAYOUTS - ROW-WISE
  // ============================================
  
  // 2-Column Grid (50-50)
  gridContainer2: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
  },
  
  gridRow2: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: rs(spacing.md),
    marginBottom: rs(spacing.md),
  },
  
  gridItem2: {
    width: isSmallScreen ? '100%' : '48%',
    minWidth: isSmallScreen ? '100%' : '45%',
    marginBottom: rs(spacing.sm),
  },
  
  // 3-Column Grid (33-33-33)
  gridContainer3: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
  },
  
  gridRow3: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: rs(spacing.sm),
    marginBottom: rs(spacing.md),
  },
  
  gridItem3: {
    width: isSmallScreen ? '100%' : '31%',
    minWidth: isSmallScreen ? '48%' : '30%',
    marginBottom: rs(spacing.sm),
  },
  
  // 4-Column Grid (25-25-25-25)
  gridContainer4: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
  },
  
  gridRow4: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: rs(spacing.sm),
    marginBottom: rs(spacing.md),
  },
  
  gridItem4: {
    width: isSmallScreen ? '48%' : '23%',
    minWidth: isSmallScreen ? '45%' : '20%',
    marginBottom: rs(spacing.sm),
  },
  
  // ============================================
  // CARDS - Full Width
  // ============================================
  
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: normalize(20),
    padding: rs(spacing.lg),
    marginBottom: rs(spacing.md),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  
  cardSmall: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: normalize(16),
    padding: rs(spacing.md),
    marginBottom: rs(spacing.sm),
  },
  
  // ============================================
  // TYPOGRAPHY - Responsive
  // ============================================
  
  title: {
    ...responsiveTypography.h1,
    color: colors.text.primary,
    marginBottom: rs(spacing.sm),
    fontWeight: '800',
  },
  
  subtitle: {
    ...responsiveTypography.h4,
    color: colors.text.secondary,
    marginBottom: rs(spacing.md),
    fontWeight: '600',
  },
  
  bodyText: {
    ...responsiveTypography.body,
    color: colors.text.primary,
    lineHeight: normalize(22),
  },
  
  smallText: {
    ...responsiveTypography.bodySmall,
    color: colors.text.secondary,
    lineHeight: normalize(20),
  },
  
  // ============================================
  // STATS GRID - 4 Columns Row-wise
  // ============================================
  
  statsContainer: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
    marginBottom: rs(spacing.xl),
  },
  
  statsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: rs(spacing.sm),
  },
  
  statCard: {
    width: isSmallScreen ? '48%' : '23%',
    minWidth: isSmallScreen ? '45%' : '20%',
    backgroundColor: colors.surface,
    borderRadius: normalize(16),
    padding: rs(spacing.md),
    alignItems: 'center',
    marginBottom: rs(spacing.sm),
  },
  
  statNumber: {
    ...responsiveTypography.h2,
    color: colors.primary,
    fontWeight: '900',
    marginBottom: rs(spacing.xs),
  },
  
  statLabel: {
    ...responsiveTypography.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  
  // ============================================
  // FACILITIES/FEATURES GRID - 2 Columns
  // ============================================
  
  facilitiesContainer: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
  },
  
  facilitiesGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: rs(spacing.md),
  },
  
  facilityCard: {
    width: isSmallScreen ? '100%' : '48%',
    minWidth: isSmallScreen ? '100%' : '45%',
    backgroundColor: colors.surface,
    borderRadius: normalize(16),
    padding: rs(spacing.lg),
    marginBottom: rs(spacing.sm),
  },
  
  // ============================================
  // SKILLS/TAGS - Horizontal Wrap
  // ============================================
  
  skillsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: rs(spacing.sm),
    marginBottom: rs(spacing.md),
  },
  
  skillTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: rs(spacing.md),
    paddingVertical: rs(spacing.sm),
    borderRadius: normalize(20),
    marginRight: rs(spacing.xs),
    marginBottom: rs(spacing.xs),
  },
  
  skillText: {
    ...responsiveTypography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  
  // ============================================
  // ACHIEVEMENTS GRID - 2 Columns
  // ============================================
  
  achievementsContainer: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
  },
  
  achievementsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: rs(spacing.md),
  },
  
  achievementCard: {
    width: isSmallScreen ? '100%' : '48%',
    minWidth: isSmallScreen ? '100%' : '45%',
    backgroundColor: colors.surface,
    borderRadius: normalize(16),
    padding: rs(spacing.lg),
    marginBottom: rs(spacing.sm),
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // ============================================
  // DEPARTMENTS GRID - 2 Columns
  // ============================================
  
  departmentsContainer: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
  },
  
  departmentsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: rs(spacing.md),
  },
  
  departmentCard: {
    width: isSmallScreen ? '100%' : '48%',
    minWidth: isSmallScreen ? '100%' : '45%',
    backgroundColor: colors.surface,
    borderRadius: normalize(16),
    padding: rs(spacing.lg),
    marginBottom: rs(spacing.sm),
  },
  
  // ============================================
  // SUBJECTS ROADMAP - Full Width Cards
  // ============================================
  
  subjectsContainer: {
    width: '100%',
    paddingHorizontal: rs(spacing.lg),
  },
  
  subjectCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: normalize(20),
    padding: rs(spacing.lg),
    marginBottom: rs(spacing.lg),
  },
  
  // ============================================
  // BUTTONS - Full Width
  // ============================================
  
  button: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: normalize(16),
    paddingVertical: rs(spacing.md),
    paddingHorizontal: rs(spacing.lg),
    alignItems: 'center',
    marginBottom: rs(spacing.md),
  },
  
  buttonText: {
    ...responsiveTypography.body,
    color: colors.text.white,
    fontWeight: '700',
  },
});

// ============================================
// USAGE EXAMPLES
// ============================================

/**
 * 2-Column Grid Example (Facilities, Departments, etc.)
 * 
 * <View style={styles.facilitiesContainer}>
 *   <View style={styles.facilitiesGrid}>
 *     {facilities.map((item) => (
 *       <View key={item.id} style={styles.facilityCard}>
 *         {/* Content *\/}
 *       </View>
 *     ))}
 *   </View>
 * </View>
 */

/**
 * 4-Column Grid Example (Stats)
 * 
 * <View style={styles.statsContainer}>
 *   <View style={styles.statsGrid}>
 *     {stats.map((stat) => (
 *       <View key={stat.id} style={styles.statCard}>
 *         {/* Content *\/}
 *       </View>
 *     ))}
 *   </View>
 * </View>
 */

/**
 * Skills/Tags Horizontal Wrap
 * 
 * <View style={styles.skillsContainer}>
 *   {skills.map((skill, index) => (
 *     <View key={index} style={styles.skillTag}>
 *       <Text style={styles.skillText}>{skill}</Text>
 *     </View>
 *   ))}
 * </View>
 */

/**
 * Full Width Subject Cards
 * 
 * <View style={styles.subjectsContainer}>
 *   {subjects.map((subject) => (
 *     <View key={subject.id} style={styles.subjectCard}>
 *       {/* Content *\/}
 *     </View>
 *   ))}
 * </View>
 */

// Export करने की जरूरत नहीं - यह सिर्फ एक reference/template file है
// इस file को directly import न करें
// बस styles को copy करके अपने screens में paste करें

export default {};
