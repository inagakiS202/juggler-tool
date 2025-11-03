// 統計的手法を用いた設定判別ライブラリ

/**
 * ベイズ更新を用いた設定確率の計算
 * @param {Object} machine - 機種データ
 * @param {Object} observed - 観測データ {totalGames, bigCount, regCount, grapeCount}
 * @returns {Object} - 各設定の事後確率
 */
function calculateBayesianProbability(machine, observed) {
    const { totalGames, bigCount, regCount, grapeCount } = observed;
    const probabilities = {};

    // 事前確率（一様分布を仮定）
    const priorProb = 1 / 6;

    for (let setting = 1; setting <= 6; setting++) {
        const settingData = machine.settings[setting];

        // 各イベントの確率を計算
        const pBig = 1 / settingData.big;
        const pReg = 1 / settingData.reg;
        const pGrape = grapeCount > 0 ? 1 / settingData.grape : null;

        // 二項分布の尤度を計算
        let likelihood = 1;

        // BIG確率の尤度（二項分布）
        if (bigCount > 0) {
            likelihood *= binomialProbability(totalGames, bigCount, pBig);
        }

        // REG確率の尤度（二項分布）
        if (regCount > 0) {
            likelihood *= binomialProbability(totalGames, regCount, pReg);
        }

        // ぶどう確率の尤度（二項分布）
        if (pGrape && grapeCount > 0) {
            likelihood *= binomialProbability(totalGames, grapeCount, pGrape);
        }

        // 事後確率 ∝ 尤度 × 事前確率
        probabilities[setting] = likelihood * priorProb;
    }

    // 正規化
    const total = Object.values(probabilities).reduce((sum, p) => sum + p, 0);
    for (let setting = 1; setting <= 6; setting++) {
        probabilities[setting] = (probabilities[setting] / total) * 100;
    }

    return probabilities;
}

/**
 * 二項分布の確率（正規近似を使用）
 * @param {number} n - 試行回数
 * @param {number} k - 成功回数
 * @param {number} p - 成功確率
 * @returns {number} - 確率
 */
function binomialProbability(n, k, p) {
    // 正規近似を使用（n が大きい場合に有効）
    const mean = n * p;
    const variance = n * p * (1 - p);
    const stdDev = Math.sqrt(variance);

    if (stdDev === 0) return 0;

    // 連続性補正を適用
    const z = (k - mean) / stdDev;

    // 正規分布の確率密度関数
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
}

/**
 * カイ二乗検定による適合度検定
 * @param {Object} machine - 機種データ
 * @param {Object} observed - 観測データ
 * @returns {Object} - 各設定のp値
 */
function chiSquareTest(machine, observed) {
    const { totalGames, bigCount, regCount, grapeCount } = observed;
    const results = {};

    for (let setting = 1; setting <= 6; setting++) {
        const settingData = machine.settings[setting];

        let chiSquare = 0;
        let degreesOfFreedom = 0;

        // BIGのカイ二乗値
        if (bigCount > 0) {
            const expectedBig = totalGames / settingData.big;
            chiSquare += Math.pow(bigCount - expectedBig, 2) / expectedBig;
            degreesOfFreedom++;
        }

        // REGのカイ二乗値
        if (regCount > 0) {
            const expectedReg = totalGames / settingData.reg;
            chiSquare += Math.pow(regCount - expectedReg, 2) / expectedReg;
            degreesOfFreedom++;
        }

        // ぶどうのカイ二乗値
        if (grapeCount > 0) {
            const expectedGrape = totalGames / settingData.grape;
            chiSquare += Math.pow(grapeCount - expectedGrape, 2) / expectedGrape;
            degreesOfFreedom++;
        }

        // p値を計算（簡易版）
        const pValue = 1 - chiSquareCDF(chiSquare, degreesOfFreedom);

        results[setting] = {
            chiSquare: chiSquare,
            pValue: pValue,
            compatible: pValue > 0.05 // 5%有意水準
        };
    }

    return results;
}

/**
 * カイ二乗累積分布関数（簡易版）
 */
function chiSquareCDF(x, df) {
    if (x <= 0) return 0;
    if (df === 1) return 2 * normalCDF(Math.sqrt(x)) - 1;
    if (df === 2) return 1 - Math.exp(-x / 2);

    // ガンマ関数を使った近似
    return 0.5; // 簡易版
}

/**
 * 正規累積分布関数
 */
function normalCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
}

/**
 * 信頼区間の計算
 * @param {number} n - サンプル数
 * @param {number} k - 成功回数
 * @param {number} confidence - 信頼水準（デフォルト95%）
 * @returns {Object} - {lower, upper, point}
 */
function confidenceInterval(n, k, confidence = 0.95) {
    const p = k / n;
    const z = confidence === 0.95 ? 1.96 : 2.576; // 95%または99%
    const se = Math.sqrt((p * (1 - p)) / n);

    return {
        point: p,
        lower: Math.max(0, p - z * se),
        upper: Math.min(1, p + z * se),
        margin: z * se
    };
}

/**
 * 逐次確率比検定（SPRT）
 * 少ない試行回数で仮説を棄却できるかを判定
 * @param {Object} machine - 機種データ
 * @param {Object} observed - 観測データ
 * @param {number} setting1 - 比較する設定1
 * @param {number} setting2 - 比較する設定2
 * @returns {string} - 'accept_H1', 'accept_H0', 'continue'
 */
function sequentialProbabilityRatioTest(machine, observed, setting1, setting2) {
    const { totalGames, bigCount, regCount } = observed;

    const p1 = 1 / machine.settings[setting1].bonus;
    const p2 = 1 / machine.settings[setting2].bonus;

    const bonusCount = bigCount + regCount;

    // 尤度比を計算
    const lr = Math.pow(p1 / p2, bonusCount) * Math.pow((1 - p1) / (1 - p2), totalGames - bonusCount);

    const alpha = 0.05; // 第一種過誤
    const beta = 0.05;  // 第二種過誤

    const A = (1 - beta) / alpha;
    const B = beta / (1 - alpha);

    if (lr >= A) {
        return 'accept_H1'; // 設定1の方が可能性が高い
    } else if (lr <= B) {
        return 'accept_H0'; // 設定2の方が可能性が高い
    } else {
        return 'continue'; // さらにデータが必要
    }
}

/**
 * 統合判別スコアの計算
 * 複数の統計手法を組み合わせた総合判定
 * @param {Object} machine - 機種データ
 * @param {Object} observed - 観測データ
 * @returns {Object} - 各設定の総合スコアと信頼度
 */
function integratedSettingAnalysis(machine, observed) {
    const { totalGames, bigCount, regCount, grapeCount } = observed;

    // ベイズ確率を計算
    const bayesianProb = calculateBayesianProbability(machine, observed);

    // カイ二乗検定
    const chiSquareResults = chiSquareTest(machine, observed);

    // 各設定の総合評価
    const analysis = {};
    const bonusCount = bigCount + regCount;
    const actualBonusRate = totalGames / bonusCount;

    // BIG/REG比率を計算（重要指標）
    const actualBigRegRatio = bigCount / Math.max(regCount, 1);

    for (let setting = 1; setting <= 6; setting++) {
        const settingData = machine.settings[setting];

        // 理論上のBIG/REG比率
        const expectedBigRegRatio = settingData.reg / settingData.big;

        // ボーナス確率の信頼区間
        const bonusCI = confidenceInterval(totalGames, bigCount + regCount);
        const expectedBonusProb = 1 / settingData.bonus;

        // 期待値が信頼区間に含まれるか
        const inConfidenceInterval =
            expectedBonusProb >= bonusCI.lower &&
            expectedBonusProb <= bonusCI.upper;

        // 総合スコア（ベイズ確率から開始）
        let score = bayesianProb[setting];

        // カイ二乗検定で適合している場合はボーナス
        if (chiSquareResults[setting].compatible) {
            score *= 1.5;
        }

        // 信頼区間に含まれている場合はボーナス
        if (inConfidenceInterval) {
            score *= 1.3;
        }

        // BIG/REG比率による補正（少ない回転数でも有効な指標）
        if (bonusCount >= 5) { // 最低5回のボーナスがあれば比率を考慮
            const ratioDiff = Math.abs(actualBigRegRatio - expectedBigRegRatio) / expectedBigRegRatio;

            // 比率が近い場合はボーナス、離れている場合はペナルティ
            if (ratioDiff < 0.3) {
                score *= 1.5; // 比率が30%以内の差ならボーナス
            } else if (ratioDiff < 0.5) {
                score *= 1.2; // 50%以内ならやや有利
            } else if (ratioDiff > 1.0) {
                score *= 0.5; // 100%以上離れていればペナルティ
            } else if (ratioDiff > 1.5) {
                score *= 0.3; // 150%以上離れていれば大幅ペナルティ
            }
        }

        // サンプルサイズによる信頼度補正（実用的に）
        let reliability;
        if (totalGames < 300) {
            reliability = totalGames / 300 * 0.4; // 300G未満は最大40%
        } else if (totalGames < 500) {
            reliability = 0.4 + (totalGames - 300) / 200 * 0.15; // 300-500Gは40-55%
        } else if (totalGames < 1000) {
            reliability = 0.55 + (totalGames - 500) / 500 * 0.20; // 500-1000Gは55-75%
        } else if (totalGames < 2000) {
            reliability = 0.75 + (totalGames - 1000) / 1000 * 0.15; // 1000-2000Gは75-90%
        } else {
            reliability = Math.min(0.90 + (totalGames - 2000) / 3000 * 0.10, 1.0); // 2000G以上は90-100%
        }

        analysis[setting] = {
            probability: bayesianProb[setting],
            chiSquare: chiSquareResults[setting],
            inConfidenceInterval: inConfidenceInterval,
            score: score,
            reliability: reliability * 100
        };
    }

    // 正規化
    const totalScore = Object.values(analysis).reduce((sum, a) => sum + a.score, 0);
    for (let setting = 1; setting <= 6; setting++) {
        analysis[setting].normalizedScore = (analysis[setting].score / totalScore) * 100;
    }

    return analysis;
}

/**
 * 必要サンプルサイズの推定
 * @param {number} effect_size - 効果量（設定間の差）
 * @param {number} power - 検出力（デフォルト80%）
 * @param {number} alpha - 有意水準（デフォルト5%）
 * @returns {number} - 必要なゲーム数
 */
function estimateRequiredSampleSize(effect_size = 0.1, power = 0.8, alpha = 0.05) {
    const z_alpha = 1.96; // 95%信頼水準
    const z_beta = 0.84;  // 80%検出力

    const n = Math.pow((z_alpha + z_beta), 2) * 2 / Math.pow(effect_size, 2);

    return Math.ceil(n);
}
