import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  cvExperiences,
  cvFormation,
  cvIdentity,
  cvOtherSkills,
  type CvTimelineEntry,
} from "@/lib/cv-data";

const accent = "#4a8f88";
const muted = "#666666";

/** Hauteur visuelle approximative d’une entrée (pour espacer les lignes quand le CV est léger). */
function estimateTimelineUnits(entries: CvTimelineEntry[]): number {
  return entries.reduce((units, entry) => {
    let u = 1;
    if (entry.details?.length) u += entry.details.length * 0.55;
    if (entry.film) u += 1.15;
    if (entry.director || entry.note) u += 0.35;
    return units + u;
  }, 0);
}

function timelineRowMarginBottom(
  formation: CvTimelineEntry[],
  experiences: typeof cvExperiences,
): number {
  const units =
    estimateTimelineUnits(formation) +
    experiences.reduce(
      (sum, group) => sum + estimateTimelineUnits(group.entries) + 0.4,
      0,
    );
  const targetUnits = 17;
  const spare = Math.max(0, targetUnits - units);
  return 5 + Math.min(6, spare * 0.45);
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingTop: 36,
    paddingBottom: 40,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#1a1a1a",
    lineHeight: 1.35,
  },
  header: {
    flexDirection: "column",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.8,
    lineHeight: 1.2,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 9,
    color: muted,
    letterSpacing: 0.4,
    lineHeight: 1.35,
  },
  timelineZone: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  section: {
    marginBottom: 11,
  },
  sectionCompact: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 7.5,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    color: accent,
    marginBottom: 5,
    fontFamily: "Helvetica-Bold",
  },
  identityColumns: {
    flexDirection: "row",
    gap: 16,
  },
  identityColumn: {
    flex: 1,
  },
  identityLine: {
    flexDirection: "row",
    marginBottom: 2.5,
    fontSize: 8.5,
    lineHeight: 1.3,
  },
  identityLabel: {
    width: 92,
    fontSize: 7,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: muted,
  },
  identityValue: {
    flex: 1,
    fontSize: 8.5,
  },
  subgroupLabel: {
    fontSize: 7.5,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: muted,
    marginBottom: 4,
    marginTop: 1,
  },
  timelineRow: {
    flexDirection: "row",
    marginBottom: 5,
    gap: 10,
  },
  period: {
    width: 62,
    fontSize: 8.5,
    color: accent,
    fontFamily: "Helvetica-Bold",
  },
  timelineBody: {
    flex: 1,
  },
  lineTitle: {
    fontSize: 9,
  },
  filmTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 1,
  },
  filmRole: {
    fontSize: 8.5,
    color: accent,
    marginBottom: 1,
  },
  filmMeta: {
    fontSize: 8,
    color: muted,
  },
  detailLine: {
    fontSize: 8,
    color: muted,
    marginTop: 1,
    paddingLeft: 6,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 4,
    gap: 10,
  },
  skillLabel: {
    width: 62,
    fontSize: 8.5,
    color: accent,
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    position: "absolute",
    bottom: 22,
    left: 44,
    right: 44,
    fontSize: 7.5,
    color: muted,
    textAlign: "center",
    letterSpacing: 1,
  },
});

function PdfIdentityLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.identityLine}>
      <Text style={styles.identityLabel}>{label}</Text>
      <Text style={styles.identityValue}>{value}</Text>
    </View>
  );
}

function PdfTimelineEntry({
  entry,
  rowMarginBottom,
}: {
  entry: CvTimelineEntry;
  rowMarginBottom: number;
}) {
  const rowStyle = [styles.timelineRow, { marginBottom: rowMarginBottom }];
  if (entry.film) {
    return (
      <View style={rowStyle}>
        <Text style={styles.period}>{entry.period}</Text>
        <View style={styles.timelineBody}>
          <Text style={styles.filmTitle}>« {entry.film} »</Text>
          <Text style={styles.filmRole}>
            {entry.role}
            {entry.format ? ` · ${entry.format}` : ""}
          </Text>
          {entry.director ? (
            <Text style={styles.filmMeta}>Réal. {entry.director}</Text>
          ) : null}
          {entry.note ? (
            <Text style={styles.filmMeta}>{entry.note}</Text>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <View style={rowStyle}>
      <Text style={styles.period}>{entry.period}</Text>
      <View style={styles.timelineBody}>
        <Text style={styles.lineTitle}>{entry.title}</Text>
        {entry.details?.map((line) => (
          <Text key={line} style={styles.detailLine}>
            – {line}
          </Text>
        ))}
      </View>
    </View>
  );
}

export function CvPdfDocument() {
  const timelineRowGap = timelineRowMarginBottom(cvFormation, cvExperiences);

  return (
    <Document
      title={`Fiche artiste — ${cvIdentity.name}`}
      author={cvIdentity.name}
      language="fr"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{cvIdentity.name}</Text>
          <Text style={styles.subtitle}>Comédien · Mannequin</Text>
        </View>

        <View style={styles.sectionCompact}>
          <Text style={styles.sectionTitle}>Identité</Text>
          <View style={styles.identityColumns}>
            <View style={styles.identityColumn}>
              <PdfIdentityLine label="Téléphone" value={cvIdentity.phone} />
              <PdfIdentityLine label="E-mail" value={cvIdentity.email} />
              <PdfIdentityLine label="Ville" value={cvIdentity.city} />
              <PdfIdentityLine label="Cheveux / yeux" value={cvIdentity.hairEyes} />
              <PdfIdentityLine label="Langues" value={cvIdentity.languages} />
            </View>
            <View style={styles.identityColumn}>
              <PdfIdentityLine
                label="Naissance"
                value={`${cvIdentity.birthDate} (${cvIdentity.age} ans)`}
              />
              <PdfIdentityLine label="Taille" value={cvIdentity.height} />
              <View style={styles.identityLine}>
                <Text style={styles.identityLabel}>Pieds à terre</Text>
                <View style={styles.identityValue}>
                  <Text style={{ fontSize: 8.5, lineHeight: 1.25 }}>
                    {cvIdentity.piedsATerreLine1}
                  </Text>
                  <Text style={{ fontSize: 8.5, lineHeight: 1.25 }}>
                    {cvIdentity.piedsATerreLine2}
                  </Text>
                </View>
              </View>
              <PdfIdentityLine label="Permis" value={cvIdentity.permits} />
            </View>
          </View>
        </View>

        <View style={styles.timelineZone}>
          <View style={[styles.section, { marginBottom: 0 }]}>
            <Text style={styles.sectionTitle}>Formation artistique</Text>
            {cvFormation.map((entry) => (
              <PdfTimelineEntry
                key={`${entry.period}-${entry.title}`}
                entry={entry}
                rowMarginBottom={timelineRowGap}
              />
            ))}
          </View>

          <View style={[styles.section, { marginBottom: 0 }]}>
            <Text style={styles.sectionTitle}>Expériences artistiques</Text>
            {cvExperiences.map((group) => (
              <View key={group.label} style={{ marginBottom: 6 }}>
                <Text style={styles.subgroupLabel}>{group.label}</Text>
                {group.entries.map((entry) => (
                  <PdfTimelineEntry
                    key={`${group.label}-${entry.period}-${entry.film ?? entry.title}`}
                    entry={entry}
                    rowMarginBottom={timelineRowGap}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autres compétences</Text>
          {cvOtherSkills.map((skill) => (
            <View key={skill.label} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{skill.label}</Text>
              <Text style={{ flex: 1, fontSize: 10 }}>{skill.value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer} fixed>
          www.benjaminbodin.fr
        </Text>
      </Page>
    </Document>
  );
}
