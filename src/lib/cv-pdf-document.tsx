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

const styles = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
    lineHeight: 1.45,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    paddingBottom: 14,
  },
  title: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: muted,
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 8,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: accent,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  identityColumns: {
    flexDirection: "row",
    gap: 24,
  },
  identityColumn: {
    flex: 1,
    gap: 8,
  },
  identityItem: {
    marginBottom: 8,
  },
  identityLabel: {
    fontSize: 7,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: muted,
    marginBottom: 2,
  },
  identityValue: {
    fontSize: 10,
  },
  subgroupLabel: {
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: muted,
    marginBottom: 6,
    marginTop: 2,
  },
  timelineRow: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 12,
  },
  period: {
    width: 68,
    fontSize: 9,
    color: accent,
    fontFamily: "Helvetica-Bold",
  },
  timelineBody: {
    flex: 1,
  },
  lineTitle: {
    fontSize: 10,
  },
  filmTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  filmRole: {
    fontSize: 9,
    color: accent,
    marginBottom: 2,
  },
  filmMeta: {
    fontSize: 9,
    color: muted,
  },
  detailLine: {
    fontSize: 9,
    color: muted,
    marginTop: 2,
    paddingLeft: 8,
  },
  skillRow: {
    flexDirection: "row",
    marginBottom: 6,
    gap: 12,
  },
  skillLabel: {
    width: 68,
    fontSize: 9,
    color: accent,
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    fontSize: 8,
    color: muted,
    textAlign: "center",
    letterSpacing: 1,
  },
});

function PdfTimelineEntry({ entry }: { entry: CvTimelineEntry }) {
  if (entry.film) {
    return (
      <View style={styles.timelineRow}>
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
    <View style={styles.timelineRow}>
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
  return (
    <Document
      title={`Fiche artiste — ${cvIdentity.name}`}
      author={cvIdentity.name}
      language="fr"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{cvIdentity.name}</Text>
          <Text style={styles.subtitle}>Comédien · Mannequin — Fiche artiste</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identité</Text>
          <View style={styles.identityColumns}>
            <View style={styles.identityColumn}>
              <View style={styles.identityItem}>
                <Text style={styles.identityLabel}>Téléphone</Text>
                <Text style={styles.identityValue}>{cvIdentity.phone}</Text>
              </View>
              <View style={styles.identityItem}>
                <Text style={styles.identityLabel}>E-mail</Text>
                <Text style={styles.identityValue}>{cvIdentity.email}</Text>
              </View>
              <View style={styles.identityItem}>
                <Text style={styles.identityLabel}>Ville</Text>
                <Text style={styles.identityValue}>{cvIdentity.city}</Text>
              </View>
              <View style={styles.identityItem}>
                <Text style={styles.identityLabel}>Cheveux / yeux</Text>
                <Text style={styles.identityValue}>{cvIdentity.hairEyes}</Text>
              </View>
              <View style={styles.identityItem}>
                <Text style={styles.identityLabel}>Langues</Text>
                <Text style={styles.identityValue}>{cvIdentity.languages}</Text>
              </View>
            </View>
            <View style={styles.identityColumn}>
              <View style={styles.identityItem}>
                <Text style={styles.identityLabel}>Date de naissance</Text>
                <Text style={styles.identityValue}>
                  {cvIdentity.birthDate} ({cvIdentity.age} ans)
                </Text>
              </View>
              <View style={styles.identityItem}>
                <Text style={styles.identityLabel}>Taille</Text>
                <Text style={styles.identityValue}>{cvIdentity.height}</Text>
              </View>
              <View style={styles.identityItem}>
                <Text style={styles.identityLabel}>
                  Villes secondaires (pieds à terre)
                </Text>
                <Text style={styles.identityValue}>
                  {cvIdentity.piedsATerreLine1}
                </Text>
                <Text style={styles.identityValue}>
                  {cvIdentity.piedsATerreLine2}
                </Text>
              </View>
              <View style={styles.identityItem}>
                <Text style={styles.identityLabel}>Permis</Text>
                <Text style={styles.identityValue}>{cvIdentity.permits}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formation artistique</Text>
          {cvFormation.map((entry) => (
            <PdfTimelineEntry key={`${entry.period}-${entry.title}`} entry={entry} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expériences artistiques</Text>
          {cvExperiences.map((group) => (
            <View key={group.label} style={{ marginBottom: 10 }}>
              <Text style={styles.subgroupLabel}>{group.label}</Text>
              {group.entries.map((entry) => (
                <PdfTimelineEntry
                  key={`${group.label}-${entry.period}-${entry.film ?? entry.title}`}
                  entry={entry}
                />
              ))}
            </View>
          ))}
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
