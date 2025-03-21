import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

export default function OptimizerCalculator() {
    const [theta, setTheta] = useState("");
    const [gradient, setGradient] = useState("");
    const [learningRate, setLearningRate] = useState("");

    const [momentum, setMomentum] = useState("");
    const [variance, setVariance] = useState("");

    const [sgdResult, setSgdResult] = useState("");
    const [adamResult, setAdamResult] = useState("");
    const [steps, setSteps] = useState("");

    const calculate = () => {
        const θ = parseFloat(theta);
        const grad = parseFloat(gradient);
        const η = parseFloat(learningRate);
        const m = parseFloat(momentum);
        const v = parseFloat(variance);
        const ε = 1e-8;

        if ([θ, grad, η].some(v => isNaN(v))) {
            setSgdResult("⚠️ Invalid input.");
            setAdamResult("");
            setSteps("");
            return;
        }

        const newThetaSGD = θ - η * grad;
        setSgdResult(`🌀 SGD New θ = ${newThetaSGD.toFixed(6)}`);

        let adamRes = "";
        if (!isNaN(m) && !isNaN(v)) {
            const newThetaAdam = θ - η * m / (Math.sqrt(v) + ε);
            adamRes = `⚡ Adam New θ = ${newThetaAdam.toFixed(6)}`;
            setAdamResult(adamRes);

            setSteps(
                `📋 Steps:

[SGD]
θ = θ - η * ∇J(θ)
= ${θ} - ${η} * ${grad}
= ${newThetaSGD.toFixed(6)}

[Adam]
θ = θ - η * m / (√v + ε)
= ${θ} - ${η} * ${m} / (√${v} + ${ε})
= ${newThetaAdam.toFixed(6)}`
            );
        } else {
            setAdamResult("ℹ️ Fill momentum & variance for Adam.");
            setSteps(
                `📋 Steps:

[SGD]
θ = θ - η * ∇J(θ)
= ${θ} - ${η} * ${grad}
= ${newThetaSGD.toFixed(6)}`
            );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>⚙️ Optimizer Calculator (SGD & Adam)</Text>

            <Text style={styles.label}>Initial θ (parameter):</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={theta} onChangeText={setTheta} />

            <Text style={styles.label}>Gradient ∇J(θ):</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={gradient} onChangeText={setGradient} />

            <Text style={styles.label}>Learning Rate (η):</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={learningRate} onChangeText={setLearningRate} />

            <Text style={styles.label}>Momentum (m):</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={momentum} onChangeText={setMomentum} />

            <Text style={styles.label}>Variance (v):</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={variance} onChangeText={setVariance} />

            <Button title="Calculate" onPress={calculate} />

            <Text style={styles.result}>{sgdResult}</Text>
            <Text style={styles.result}>{adamResult}</Text>

            {steps !== "" && (
                <>
                    <Text style={styles.stepsTitle}>🧮 Calculation Steps:</Text>
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
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#222",
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    result: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
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
