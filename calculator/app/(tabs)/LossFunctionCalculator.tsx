import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

export default function LossFunctionCalculator() {
    const [trueValues, setTrueValues] = useState("");
    const [predictedValues, setPredictedValues] = useState("");
    const [result, setResult] = useState("");
    const [steps, setSteps] = useState("");

    const parseArray = (str: string) => {
        return str.split(",").map(val => parseFloat(val.trim()));
    };

    const calculateMSE = () => {
        const yTrue = parseArray(trueValues);
        const yPred = parseArray(predictedValues);

        if (yTrue.length !== yPred.length || yTrue.includes(NaN) || yPred.includes(NaN)) {
            setResult("⚠️ Invalid input.");
            setSteps("");
            return;
        }

        let sum = 0;
        let stepsArr = [];

        for (let i = 0; i < yTrue.length; i++) {
            const diff = yTrue[i] - yPred[i];
            const sq = diff ** 2;
            sum += sq;
            stepsArr.push(`(${yTrue[i]} - ${yPred[i]})² = ${sq.toFixed(4)}`);
        }

        const mse = sum / yTrue.length;
        setResult(`✅ MSE = ${mse.toFixed(4)}`);
        setSteps(stepsArr.join("\n") + `\n\nMSE = Sum / n = ${sum.toFixed(4)} / ${yTrue.length} = ${mse.toFixed(4)}`);
    };

    const calculateBCE = () => {
        const yTrue = parseArray(trueValues);
        const yPred = parseArray(predictedValues);

        if (yTrue.length !== yPred.length || yTrue.includes(NaN) || yPred.includes(NaN)) {
            setResult("⚠️ Invalid input.");
            setSteps("");
            return;
        }

        let sum = 0;
        let stepsArr = [];

        for (let i = 0; i < yTrue.length; i++) {
            const y = yTrue[i];
            const p = yPred[i];
            const val = -(y * Math.log(p) + (1 - y) * Math.log(1 - p));
            sum += val;
            stepsArr.push(`-(${y} * log(${p.toFixed(4)}) + (1 - ${y}) * log(${(1 - p).toFixed(4)})) = ${val.toFixed(4)}`);
        }

        const bce = sum / yTrue.length;
        setResult(`✅ Binary Cross Entropy = ${bce.toFixed(4)}`);
        setSteps(stepsArr.join("\n") + `\n\nBCE = Sum / n = ${sum.toFixed(4)} / ${yTrue.length} = ${bce.toFixed(4)}`);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>📉 Loss Function Calculator</Text>

            <Text style={styles.label}>True Values (comma separated):</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. 1, 0, 1"
                onChangeText={setTrueValues}
                value={trueValues}
            />

            <Text style={styles.label}>Predicted Values (comma separated):</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. 0.9, 0.1, 0.8"
                onChangeText={setPredictedValues}
                value={predictedValues}
            />

            <Button title="Calculate MSE" onPress={calculateMSE} />
            <View style={{ height: 10 }} />
            <Button title="Calculate Binary Cross Entropy" onPress={calculateBCE} />

            <Text style={styles.result}>{result}</Text>
            {steps !== "" && (
                <>
                    <Text style={styles.stepsTitle}>Steps:</Text>
                    <Text style={styles.steps}>{steps}</Text>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 80,
        backgroundColor: "#f0f4f8",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#222",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: "bold",
        color: "#0a84ff",
        textAlign: "center",
    },
    stepsTitle: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    steps: {
        marginTop: 5,
        backgroundColor: "#eef3f9",
        padding: 10,
        borderRadius: 8,
        fontFamily: "monospace",
        fontSize: 14,
    },
});
