import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function CetakDokumen(data) {
  console.log("pdf props", data);
  let newData = {
    nama: "dulah",
    jabatan: "depan",
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Halo {newData.nama}</Text>
        </View>
        <View style={styles.section}>
          <Text>Halo ya {newData.jabatan}</Text>
        </View>
      </Page>
    </Document>
  );
}
