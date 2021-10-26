import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
});

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff",
        fontFamily: "Roboto"
    },
    section: {
        marginVertical: 5,
        marginHorizontal: 10,
    },
    vote_text: {
        fontSize: 14
    },
});

export default function MyDocument({ info }) {

    function findFirstParent() {
        if (info.length !== 0) {
            return info[0][2];
        }
    }

    function ViewList(parent) {
        return (
            <View key={parent + 1} style={styles.section}>
                {
                    info.map(elem =>
                        elem[2] === parent ?
                            <div key={elem[0]}>
                                <Text style={styles.vote_text}>{elem[1]}</Text>
                                {elem[3] !== false ? ViewList(elem[0]) : null}
                            </div>
                            :
                            null
                    )
                }
            </View>
        )
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {ViewList(findFirstParent())}
            </Page>
        </Document>
    )
}