import { Document, Page, Path, StyleSheet, Svg, Text, View } from '@react-pdf/renderer'

interface QualityHistoryProps {
  [key: string]: 'bom' | 'moderado' | 'ruim' | 'péssimo'
}

interface SearchedNeighborhoodProps {
  name: string
  actual_quality: string
  history: QualityHistoryProps
}

interface DownloadPdfProps {
  neighborhoods: SearchedNeighborhoodProps[]
}

// Estilos do PDF
const styles = StyleSheet.create({
  page: { padding: 20 },
  title: { fontSize: 18, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' },
  sectionQuality: { fontSize: 14, marginTop: 5 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoImage: { width: 32, height: 32, marginRight: 10 },
  table: { width: '100%', borderStyle: 'solid', borderWidth: 1, marginTop: 10 },
  tableRow: { flexDirection: 'row' },
  tableCell: { padding: 5, fontSize: 12, borderBottomWidth: 1, flex: 1, textAlign: 'center' },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 10 },
  historyContainer: { marginTop: 5, borderTopWidth: 1, borderTopColor: '#000' },
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR')
}

export const AirQualityPdf = ({ neighborhoods }: DownloadPdfProps) => {
  if (!Array.isArray(neighborhoods) || neighborhoods.length === 0) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Nenhum dado disponível para gerar o PDF</Text>
        </Page>
      </Document>
    )
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Svg width="32" height="32" fill="#4337e1" viewBox="0 0 256 256">
              <Path d="M184,184a32,32,0,0,1-32,32c-13.7,0-26.95-8.93-31.5-21.22a8,8,0,0,1,15-5.56C137.74,195.27,145,200,152,200a16,16,0,0,0,0-32H40a8,8,0,0,1,0-16H152A32,32,0,0,1,184,184Zm-64-80a32,32,0,0,0,0-64c-13.7,0-26.95,8.93-31.5,21.22a8,8,0,0,0,15,5.56C105.74,60.73,113,56,120,56a16,16,0,0,1,0,32H24a8,8,0,0,0,0,16Zm88-32c-13.7,0-26.95,8.93-31.5,21.22a8,8,0,0,0,15,5.56C193.74,92.73,201,88,208,88a16,16,0,0,1,0,32H32a8,8,0,0,0,0,16H208a32,32,0,0,0,0-64Z" />
            </Svg>

            <Text style={{ fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' }}>
              Air Quality
            </Text>
          </View>

          <Text style={{ fontSize: 14 }}>Patrick Morais</Text>
        </View>

        <Text style={styles.title}>Relatório de Qualidade do Ar</Text>

        {neighborhoods.map(n => (
          <View key={n.name} style={{ marginBottom: 15 }}>
            <Text style={styles.sectionTitle}>Bairro: {n.name}</Text>
            <Text style={styles.sectionQuality}>
              Qualidade Atual: {n.actual_quality} - {formatDate(new Date().toISOString())}
            </Text>

            {Object.keys(n.history).length > 0 && (
              <View style={styles.historyContainer}>
                <Text style={styles.sectionTitle}>Histórico de Qualidade do Ar</Text>
                <View style={styles.table}>
                  <View style={[styles.tableRow, { backgroundColor: '#e4e4e4' }]}>
                    <Text style={styles.tableCell}>Data</Text>
                    <Text style={styles.tableCell}>Qualidade</Text>
                  </View>

                  {Object.entries(n.history).map(([date, quality]) => (
                    <View key={date} style={styles.tableRow}>
                      <Text style={styles.tableCell}>{formatDate(date)}</Text>
                      <Text style={styles.tableCell}>{quality}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        ))}
      </Page>
    </Document>
  )
}
