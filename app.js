// ジャグラー機種データ（動的読み込み用）
let machineData = {};
let machineDataRaw = {}; // JSONから読み込んだ生データ

// 機種データを読み込む
async function loadMachineData() {
    try {
        const response = await fetch('machine-data.json');
        const data = await response.json();
        machineDataRaw = data.machines;

        // データ形式を変換（分母形式から確率形式へ）
        for (const [key, machine] of Object.entries(data.machines)) {
            machineData[key] = {
                name: machine.name,
                version: machine.version,
                lastUpdated: machine.lastUpdated,
                settings: {}
            };

            for (const [setting, values] of Object.entries(machine.settings)) {
                machineData[key].settings[setting] = {
                    big: 1 / values.big,
                    reg: 1 / values.reg,
                    grape: 1 / values.grape,
                    bonus: 1 / values.bonus,
                    // 生データも保持
                    bigDenom: values.big,
                    regDenom: values.reg,
                    grapeDenom: values.grape,
                    bonusDenom: values.bonus
                };
            }
        }

        console.log('機種データを読み込みました', machineData);
    } catch (error) {
        console.error('機種データの読み込みに失敗しました:', error);
        // フォールバック用の埋め込みデータを使用
        useFallbackData();
    }
}

// フォールバック用データ
function useFallbackData() {
    // machineDataRawも設定（統計ライブラリ用）
    machineDataRaw = {
        myJuggler5: {
            name: 'マイジャグラーV',
            settings: {
                1: { big: 287.4, reg: 431.2, grape: 6.35, bonus: 172.5 },
                2: { big: 282.5, reg: 364.1, grape: 6.30, bonus: 159.1 },
                3: { big: 273.1, reg: 341.3, grape: 6.25, bonus: 151.7 },
                4: { big: 264.3, reg: 292.6, grape: 6.23, bonus: 138.9 },
                5: { big: 252.1, reg: 277.7, grape: 6.18, bonus: 132.1 },
                6: { big: 240.9, reg: 240.9, grape: 6.07, bonus: 120.5 }
            }
        },
        goGo5: {
            name: 'ゴーゴージャグラー3',
            settings: {
                1: { big: 276.2, reg: 399.6, grape: 6.35, bonus: 163.4 },
                2: { big: 266.4, reg: 348.6, grape: 6.30, bonus: 151.0 },
                3: { big: 256.0, reg: 315.1, grape: 6.25, bonus: 141.3 },
                4: { big: 252.1, reg: 292.6, grape: 6.23, bonus: 135.4 },
                5: { big: 241.0, reg: 273.1, grape: 6.18, bonus: 128.0 },
                6: { big: 229.1, reg: 229.1, grape: 6.07, bonus: 114.6 }
            }
        },
        happy: {
            name: 'ハッピージャグラーV III',
            settings: {
                1: { big: 303.4, reg: 528.5, grape: 6.49, bonus: 192.9 },
                2: { big: 297.9, reg: 442.8, grape: 6.35, bonus: 178.0 },
                3: { big: 280.1, reg: 390.1, grape: 6.25, bonus: 163.2 },
                4: { big: 268.6, reg: 334.4, grape: 6.18, bonus: 149.2 },
                5: { big: 252.1, reg: 287.4, grape: 6.07, bonus: 134.3 },
                6: { big: 240.9, reg: 240.9, grape: 6.00, bonus: 120.5 }
            }
        },
        funky2: {
            name: 'ファンキージャグラー2',
            settings: {
                1: { big: 273.1, reg: 409.6, grape: 6.35, bonus: 163.8 },
                2: { big: 268.6, reg: 348.6, grape: 6.30, bonus: 151.9 },
                3: { big: 260.1, reg: 318.1, grape: 6.25, bonus: 143.3 },
                4: { big: 252.1, reg: 287.4, grape: 6.18, bonus: 134.3 },
                5: { big: 241.0, reg: 268.6, grape: 6.07, bonus: 126.8 },
                6: { big: 229.1, reg: 229.1, grape: 6.00, bonus: 114.6 }
            }
        },
        neoAim: {
            name: 'アイムジャグラーEX AnniversaryEdition',
            settings: {
                1: { big: 287.4, reg: 431.2, grape: 6.49, bonus: 172.5 },
                2: { big: 273.1, reg: 364.1, grape: 6.35, bonus: 156.0 },
                3: { big: 268.6, reg: 334.4, grape: 6.25, bonus: 148.9 },
                4: { big: 264.3, reg: 287.4, grape: 6.18, bonus: 137.7 },
                5: { big: 252.1, reg: 252.1, grape: 6.07, bonus: 126.0 },
                6: { big: 234.1, reg: 234.1, grape: 6.00, bonus: 117.0 }
            }
        }
    };

    machineData = {
        myJuggler5: {
            name: 'マイジャグラーV',
            settings: {
                1: { big: 1/287.4, reg: 1/431.2, grape: 1/6.35, bonus: 1/172.5, bigDenom: 287.4, regDenom: 431.2, grapeDenom: 6.35, bonusDenom: 172.5 },
                2: { big: 1/282.5, reg: 1/364.1, grape: 1/6.30, bonus: 1/159.1, bigDenom: 282.5, regDenom: 364.1, grapeDenom: 6.30, bonusDenom: 159.1 },
                3: { big: 1/273.1, reg: 1/341.3, grape: 1/6.25, bonus: 1/151.7, bigDenom: 273.1, regDenom: 341.3, grapeDenom: 6.25, bonusDenom: 151.7 },
                4: { big: 1/264.3, reg: 1/292.6, grape: 1/6.23, bonus: 1/138.9, bigDenom: 264.3, regDenom: 292.6, grapeDenom: 6.23, bonusDenom: 138.9 },
                5: { big: 1/252.1, reg: 1/277.7, grape: 1/6.18, bonus: 1/132.1, bigDenom: 252.1, regDenom: 277.7, grapeDenom: 6.18, bonusDenom: 132.1 },
                6: { big: 1/240.9, reg: 1/240.9, grape: 1/6.07, bonus: 1/120.5, bigDenom: 240.9, regDenom: 240.9, grapeDenom: 6.07, bonusDenom: 120.5 }
            }
        },
        goGo5: {
            name: 'ゴーゴージャグラー3',
            settings: {
                1: { big: 1/276.2, reg: 1/399.6, grape: 1/6.35, bonus: 1/163.4, bigDenom: 276.2, regDenom: 399.6, grapeDenom: 6.35, bonusDenom: 163.4 },
                2: { big: 1/266.4, reg: 1/348.6, grape: 1/6.30, bonus: 1/151.0, bigDenom: 266.4, regDenom: 348.6, grapeDenom: 6.30, bonusDenom: 151.0 },
                3: { big: 1/256.0, reg: 1/315.1, grape: 1/6.25, bonus: 1/141.3, bigDenom: 256.0, regDenom: 315.1, grapeDenom: 6.25, bonusDenom: 141.3 },
                4: { big: 1/252.1, reg: 1/292.6, grape: 1/6.23, bonus: 1/135.4, bigDenom: 252.1, regDenom: 292.6, grapeDenom: 6.23, bonusDenom: 135.4 },
                5: { big: 1/241.0, reg: 1/273.1, grape: 1/6.18, bonus: 1/128.0, bigDenom: 241.0, regDenom: 273.1, grapeDenom: 6.18, bonusDenom: 128.0 },
                6: { big: 1/229.1, reg: 1/229.1, grape: 1/6.07, bonus: 1/114.6, bigDenom: 229.1, regDenom: 229.1, grapeDenom: 6.07, bonusDenom: 114.6 }
            }
        },
        happy: {
            name: 'ハッピージャグラーV III',
            settings: {
                1: { big: 1/303.4, reg: 1/528.5, grape: 1/6.49, bonus: 1/192.9, bigDenom: 303.4, regDenom: 528.5, grapeDenom: 6.49, bonusDenom: 192.9 },
                2: { big: 1/297.9, reg: 1/442.8, grape: 1/6.35, bonus: 1/178.0, bigDenom: 297.9, regDenom: 442.8, grapeDenom: 6.35, bonusDenom: 178.0 },
                3: { big: 1/280.1, reg: 1/390.1, grape: 1/6.25, bonus: 1/163.2, bigDenom: 280.1, regDenom: 390.1, grapeDenom: 6.25, bonusDenom: 163.2 },
                4: { big: 1/268.6, reg: 1/334.4, grape: 1/6.18, bonus: 1/149.2, bigDenom: 268.6, regDenom: 334.4, grapeDenom: 6.18, bonusDenom: 149.2 },
                5: { big: 1/252.1, reg: 1/287.4, grape: 1/6.07, bonus: 1/134.3, bigDenom: 252.1, regDenom: 287.4, grapeDenom: 6.07, bonusDenom: 134.3 },
                6: { big: 1/240.9, reg: 1/240.9, grape: 1/6.00, bonus: 1/120.5, bigDenom: 240.9, regDenom: 240.9, grapeDenom: 6.00, bonusDenom: 120.5 }
            }
        },
        funky2: {
            name: 'ファンキージャグラー2',
            settings: {
                1: { big: 1/273.1, reg: 1/409.6, grape: 1/6.35, bonus: 1/163.8, bigDenom: 273.1, regDenom: 409.6, grapeDenom: 6.35, bonusDenom: 163.8 },
                2: { big: 1/268.6, reg: 1/348.6, grape: 1/6.30, bonus: 1/151.9, bigDenom: 268.6, regDenom: 348.6, grapeDenom: 6.30, bonusDenom: 151.9 },
                3: { big: 1/260.1, reg: 1/318.1, grape: 1/6.25, bonus: 1/143.3, bigDenom: 260.1, regDenom: 318.1, grapeDenom: 6.25, bonusDenom: 143.3 },
                4: { big: 1/252.1, reg: 1/287.4, grape: 1/6.18, bonus: 1/134.3, bigDenom: 252.1, regDenom: 287.4, grapeDenom: 6.18, bonusDenom: 134.3 },
                5: { big: 1/241.0, reg: 1/268.6, grape: 1/6.07, bonus: 1/126.8, bigDenom: 241.0, regDenom: 268.6, grapeDenom: 6.07, bonusDenom: 126.8 },
                6: { big: 1/229.1, reg: 1/229.1, grape: 1/6.00, bonus: 1/114.6, bigDenom: 229.1, regDenom: 229.1, grapeDenom: 6.00, bonusDenom: 114.6 }
            }
        },
        neoAim: {
            name: 'アイムジャグラーEX AnniversaryEdition',
            settings: {
                1: { big: 1/287.4, reg: 1/431.2, grape: 1/6.49, bonus: 1/172.5, bigDenom: 287.4, regDenom: 431.2, grapeDenom: 6.49, bonusDenom: 172.5 },
                2: { big: 1/273.1, reg: 1/364.1, grape: 1/6.35, bonus: 1/156.0, bigDenom: 273.1, regDenom: 364.1, grapeDenom: 6.35, bonusDenom: 156.0 },
                3: { big: 1/268.6, reg: 1/334.4, grape: 1/6.25, bonus: 1/148.9, bigDenom: 268.6, regDenom: 334.4, grapeDenom: 6.25, bonusDenom: 148.9 },
                4: { big: 1/264.3, reg: 1/287.4, grape: 1/6.18, bonus: 1/137.7, bigDenom: 264.3, regDenom: 287.4, grapeDenom: 6.18, bonusDenom: 137.7 },
                5: { big: 1/252.1, reg: 1/252.1, grape: 1/6.07, bonus: 1/126.0, bigDenom: 252.1, regDenom: 252.1, grapeDenom: 6.07, bonusDenom: 126.0 },
                6: { big: 1/234.1, reg: 1/234.1, grape: 1/6.00, bonus: 1/117.0, bigDenom: 234.1, regDenom: 234.1, grapeDenom: 6.00, bonusDenom: 117.0 }
            }
        }
    };
}

// DOM要素
const elements = {
    machineType: document.getElementById('machineType'),
    totalGames: document.getElementById('totalGames'),
    bigCount: document.getElementById('bigCount'),
    regCount: document.getElementById('regCount'),
    grapeCount: document.getElementById('grapeCount'),
    cherryCount: document.getElementById('cherryCount'),
    investmentCoins: document.getElementById('investmentCoins'),
    recoveryCoins: document.getElementById('recoveryCoins'),
    calculateBtn: document.getElementById('calculateBtn'),
    resetBtn: document.getElementById('resetBtn'),
    saveDataBtn: document.getElementById('saveDataBtn'),
    exportDataBtn: document.getElementById('exportDataBtn'),
    importDataFile: document.getElementById('importDataFile'),
    clearAllDataBtn: document.getElementById('clearAllDataBtn'),
    resultSection: document.getElementById('resultSection'),
    bonusRate: document.getElementById('bonusRate'),
    bigRate: document.getElementById('bigRate'),
    regRate: document.getElementById('regRate'),
    grapeRate: document.getElementById('grapeRate'),
    cherryRate: document.getElementById('cherryRate'),
    grapeResult: document.getElementById('grapeResult'),
    cherryResult: document.getElementById('cherryResult'),
    profitSection: document.getElementById('profitSection'),
    investmentDisplay: document.getElementById('investmentDisplay'),
    recoveryDisplay: document.getElementById('recoveryDisplay'),
    profitDisplay: document.getElementById('profitDisplay'),
    profitBox: document.getElementById('profitBox'),
    payoutRate: document.getElementById('payoutRate'),
    profitYen: document.getElementById('profitYen'),
    settingGraph: document.getElementById('settingGraph'),
    recommendedSetting: document.getElementById('recommendedSetting'),
    historyList: document.getElementById('historyList')
};

// イベントリスナー
elements.calculateBtn.addEventListener('click', calculateSettings);
elements.resetBtn.addEventListener('click', resetForm);
elements.saveDataBtn.addEventListener('click', saveToHistory);
elements.exportDataBtn.addEventListener('click', exportHistoryToFile);
elements.importDataFile.addEventListener('change', importHistoryFromFile);
elements.clearAllDataBtn.addEventListener('click', clearAllHistory);

// ローカルストレージから履歴を読み込み
loadHistory();

// 増減ボタンの関数
function incrementValue(fieldId, amount) {
    const field = document.getElementById(fieldId);
    const currentValue = parseInt(field.value) || 0;
    field.value = currentValue + amount;
}

function decrementValue(fieldId, amount) {
    const field = document.getElementById(fieldId);
    const currentValue = parseInt(field.value) || 0;
    const newValue = Math.max(0, currentValue - amount);
    field.value = newValue;
}

function addValue(fieldId, amount) {
    const field = document.getElementById(fieldId);
    const currentValue = parseInt(field.value) || 0;
    field.value = currentValue + amount;
}

// 設定判別計算
function calculateSettings() {
    const totalGames = parseInt(elements.totalGames.value) || 0;
    const bigCount = parseInt(elements.bigCount.value) || 0;
    const regCount = parseInt(elements.regCount.value) || 0;
    const grapeCount = parseInt(elements.grapeCount.value) || 0;
    const cherryCount = parseInt(elements.cherryCount.value) || 0;

    // バリデーション
    if (totalGames === 0 || (bigCount === 0 && regCount === 0)) {
        alert('総ゲーム数とボーナス回数を入力してください');
        return;
    }

    // 実際の確率を計算
    const actualBigRate = totalGames / bigCount;
    const actualRegRate = totalGames / regCount;
    const actualBonusRate = totalGames / (bigCount + regCount);
    const actualGrapeRate = grapeCount > 0 ? totalGames / grapeCount : null;

    // 確率を表示
    elements.bonusRate.textContent = `1/${actualBonusRate.toFixed(1)}`;
    elements.bigRate.textContent = `1/${actualBigRate.toFixed(1)}`;
    elements.regRate.textContent = `1/${actualRegRate.toFixed(1)}`;

    if (actualGrapeRate) {
        elements.grapeRate.textContent = `1/${actualGrapeRate.toFixed(2)}`;
        elements.grapeResult.style.display = 'flex';
    } else {
        elements.grapeResult.style.display = 'none';
    }

    if (cherryCount > 0) {
        const actualCherryRate = totalGames / cherryCount;
        elements.cherryRate.textContent = `1/${actualCherryRate.toFixed(2)}`;
        elements.cherryResult.style.display = 'flex';
    } else {
        elements.cherryResult.style.display = 'none';
    }

    // 設定推測を計算（統計ライブラリを使用）
    const machineType = elements.machineType.value;
    const machine = machineData[machineType];

    // 統計ライブラリが読み込まれているかチェック
    if (typeof integratedSettingAnalysis === 'function') {
        // 高度な統計解析を使用
        const observed = { totalGames, bigCount, regCount, grapeCount };
        const analysis = integratedSettingAnalysis(machineDataRaw[machineType], observed);

        // グラフ傾向分析の結果を取得
        const graphTrendData = localStorage.getItem('latestGraphTrend');
        let graphTrend = null;
        if (graphTrendData) {
            try {
                graphTrend = JSON.parse(graphTrendData);
            } catch (e) {
                console.error('グラフ傾向データの解析エラー:', e);
            }
        }

        // グラフ傾向をスコアに反映
        if (graphTrend && graphTrend.settingBonus) {
            const bonus = graphTrend.settingBonus;

            // 傾向に応じてスコアを調整
            for (let setting = 1; setting <= 6; setting++) {
                if (bonus > 0) {
                    // 右肩上がり → 高設定（5,6）にボーナス
                    if (setting >= 5) {
                        analysis[setting].score *= (1 + bonus / 100);
                    } else if (setting <= 2) {
                        // 低設定にペナルティ
                        analysis[setting].score *= (1 - bonus / 200);
                    }
                } else if (bonus < 0) {
                    // 右肩下がり → 低設定（1,2）の可能性UP、高設定DOWN
                    if (setting <= 2) {
                        analysis[setting].score *= (1 + Math.abs(bonus) / 100);
                    } else if (setting >= 5) {
                        analysis[setting].score *= (1 - Math.abs(bonus) / 200);
                    }
                }
            }

            // 再正規化
            const totalScore = Object.values(analysis).reduce((sum, a) => sum + a.score, 0);
            for (let setting = 1; setting <= 6; setting++) {
                analysis[setting].normalizedScore = (analysis[setting].score / totalScore) * 100;
            }
        }

        // 正規化スコアを確率として使用
        const probabilities = {};
        for (let setting = 1; setting <= 6; setting++) {
            probabilities[setting] = analysis[setting].normalizedScore;
        }

        // グラフを表示（信頼度情報も追加）
        displaySettingGraphAdvanced(probabilities, analysis, totalGames, actualBonusRate, graphTrend);
    } else {
        // フォールバック: 従来の簡易版
        const probabilities = calculateProbabilities(machine, actualBonusRate, actualBigRate, actualRegRate, actualGrapeRate, totalGames);
        displaySettingGraph(probabilities);
    }

    // 収支を計算・表示
    calculateProfit();

    // 結果セクションを表示
    elements.resultSection.style.display = 'block';
    elements.resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 収支計算
function calculateProfit() {
    const investment = parseInt(elements.investmentCoins.value) || 0;
    const recovery = parseInt(elements.recoveryCoins.value) || 0;

    if (investment === 0 && recovery === 0) {
        elements.profitSection.style.display = 'none';
        return;
    }

    const profit = recovery - investment;
    const profitYen = profit * 20; // 20円/枚換算
    const payoutRate = investment > 0 ? ((recovery / investment) * 100).toFixed(1) : 0;

    // 表示
    elements.investmentDisplay.textContent = `${investment.toLocaleString()}枚`;
    elements.recoveryDisplay.textContent = `${recovery.toLocaleString()}枚`;
    elements.profitDisplay.textContent = `${profit >= 0 ? '+' : ''}${profit.toLocaleString()}枚`;
    elements.payoutRate.textContent = `${payoutRate}%`;
    elements.profitYen.textContent = `${profitYen >= 0 ? '+' : ''}${profitYen.toLocaleString()}円`;

    // 収支ボックスの色を変更
    elements.profitBox.classList.remove('profit-positive', 'profit-negative', 'profit-result');
    if (profit > 0) {
        elements.profitBox.classList.add('profit-positive');
    } else if (profit < 0) {
        elements.profitBox.classList.add('profit-negative');
    } else {
        elements.profitBox.classList.add('profit-result');
    }

    elements.profitSection.style.display = 'block';
}

// 各設定の可能性を計算（簡易版ベイズ推定）
function calculateProbabilities(machine, actualBonus, actualBig, actualReg, actualGrape, totalGames) {
    const probabilities = {};
    let totalScore = 0;

    for (let setting = 1; setting <= 6; setting++) {
        const settingData = machine.settings[setting];
        const expectedBonus = 1 / settingData.bonus;
        const expectedBig = 1 / settingData.big;
        const expectedReg = 1 / settingData.reg;
        const expectedGrape = actualGrape ? 1 / settingData.grape : null;

        // スコア計算（実測値と理論値の差が小さいほど高スコア）
        let score = 1000;

        // ボーナス合算の重み付け（最重要）
        const bonusDiff = Math.abs(actualBonus - expectedBonus) / expectedBonus;
        score -= bonusDiff * 500;

        // BIG確率の重み付け
        const bigDiff = Math.abs(actualBig - expectedBig) / expectedBig;
        score -= bigDiff * 300;

        // REG確率の重み付け
        const regDiff = Math.abs(actualReg - expectedReg) / expectedReg;
        score -= regDiff * 300;

        // ぶどう確率の重み付け（オプション）
        if (expectedGrape && actualGrape) {
            const grapeDiff = Math.abs(actualGrape - expectedGrape) / expectedGrape;
            score -= grapeDiff * 200;
        }

        // 試行回数による信頼度補正
        const reliability = Math.min(totalGames / 3000, 1.0);
        score = score * reliability + (1 - reliability) * 500;

        score = Math.max(score, 0);
        probabilities[setting] = score;
        totalScore += score;
    }

    // 正規化してパーセンテージに
    for (let setting = 1; setting <= 6; setting++) {
        probabilities[setting] = (probabilities[setting] / totalScore) * 100;
    }

    return probabilities;
}

// 設定グラフを表示（高度版：統計情報付き）
function displaySettingGraphAdvanced(probabilities, analysis, totalGames, actualBonusRate, graphTrend) {
    elements.settingGraph.innerHTML = '';

    let maxSetting = 1;
    let maxProb = 0;

    for (let setting = 1; setting <= 6; setting++) {
        const prob = probabilities[setting];
        const settingAnalysis = analysis[setting];

        if (prob > maxProb) {
            maxProb = prob;
            maxSetting = setting;
        }

        const barDiv = document.createElement('div');
        barDiv.className = 'setting-bar';

        const label = document.createElement('div');
        label.className = 'setting-label';
        label.textContent = `設定${setting}`;

        const container = document.createElement('div');
        container.className = 'bar-container';

        const fill = document.createElement('div');
        fill.className = 'bar-fill';
        fill.style.width = `${prob}%`;

        // 信頼区間に含まれる場合は色を変更
        if (settingAnalysis.inConfidenceInterval) {
            fill.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
        }

        const percentage = document.createElement('span');
        percentage.className = 'bar-percentage';
        percentage.textContent = `${prob.toFixed(1)}%`;

        fill.appendChild(percentage);
        container.appendChild(fill);
        barDiv.appendChild(label);
        barDiv.appendChild(container);
        elements.settingGraph.appendChild(barDiv);
    }

    // 推奨設定を表示（複数候補方式）
    const avgReliability = analysis[maxSetting].reliability.toFixed(0);

    // 上位候補を抽出（確率10%以上）
    const candidates = [];
    for (let setting = 1; setting <= 6; setting++) {
        if (analysis[setting].normalizedScore >= 10) {
            candidates.push({
                setting: setting,
                score: analysis[setting].normalizedScore
            });
        }
    }
    candidates.sort((a, b) => b.score - a.score);

    // 推奨設定テキストを生成
    let recommendationText;
    if (candidates.length === 1) {
        recommendationText = `設定${maxSetting}（${maxProb.toFixed(1)}% / 信頼度${avgReliability}%）`;
    } else if (candidates.length <= 3) {
        const candidateText = candidates.map(c => `設定${c.setting}`).join(' or ');
        recommendationText = `${candidateText}（最有力: 設定${maxSetting} ${maxProb.toFixed(1)}%）`;
    } else {
        recommendationText = `設定${maxSetting}（${maxProb.toFixed(1)}%）※他候補あり`;
    }

    elements.recommendedSetting.textContent = recommendationText;

    // 簡易的なヒントを追加
    if (totalGames >= 300) {
        const hintDiv = document.createElement('div');
        hintDiv.style.cssText = 'margin-top: 12px; padding: 10px; background-color: #e7f3ff; border: 1px solid #4a9eff; border-radius: 6px; font-size: 13px; color: #004085;';

        let hintText = `<strong>💡 判別ヒント</strong><br>`;
        hintText += `現在: ${totalGames}G 合算1/${actualBonusRate.toFixed(1)}<br>`;

        // グラフ傾向情報を追加
        if (graphTrend && graphTrend.message) {
            hintText += `グラフ: ${graphTrend.trend === 'rising' ? '📈 右肩上がり' :
                                   graphTrend.trend === 'falling' ? '📉 右肩下がり' :
                                   graphTrend.trend === 'slightly_rising' ? '📊 やや上昇' :
                                   graphTrend.trend === 'slightly_falling' ? '📉 やや下降' :
                                   '➡️ 横ばい'}<br>`;
        }

        if (totalGames < 500) {
            hintText += `継続推奨: あと${500 - totalGames}G回すと精度向上`;
        } else if (totalGames < 1000) {
            hintText += `あと${1000 - totalGames}G回すとより確実`;
        } else {
            hintText += `十分なサンプル数です`;
        }

        hintDiv.innerHTML = hintText;

        // 既存のヒントがあれば削除
        const existingHint = elements.settingGraph.parentElement.querySelector('.hint-message');
        if (existingHint) {
            existingHint.remove();
        }

        hintDiv.className = 'hint-message';
        elements.settingGraph.parentElement.appendChild(hintDiv);
    }
}

// 設定グラフを表示（従来版：フォールバック用）
function displaySettingGraph(probabilities) {
    elements.settingGraph.innerHTML = '';

    let maxSetting = 1;
    let maxProb = 0;

    for (let setting = 1; setting <= 6; setting++) {
        const prob = probabilities[setting];

        if (prob > maxProb) {
            maxProb = prob;
            maxSetting = setting;
        }

        const barDiv = document.createElement('div');
        barDiv.className = 'setting-bar';

        const label = document.createElement('div');
        label.className = 'setting-label';
        label.textContent = `設定${setting}`;

        const container = document.createElement('div');
        container.className = 'bar-container';

        const fill = document.createElement('div');
        fill.className = 'bar-fill';
        fill.style.width = `${prob}%`;

        const percentage = document.createElement('span');
        percentage.className = 'bar-percentage';
        percentage.textContent = `${prob.toFixed(1)}%`;

        fill.appendChild(percentage);
        container.appendChild(fill);
        barDiv.appendChild(label);
        barDiv.appendChild(container);
        elements.settingGraph.appendChild(barDiv);
    }

    // 推奨設定を表示
    elements.recommendedSetting.textContent = `設定${maxSetting}（${maxProb.toFixed(1)}%）`;
}

// フォームをリセット
function resetForm() {
    elements.totalGames.value = '0';
    elements.bigCount.value = '0';
    elements.regCount.value = '0';
    elements.grapeCount.value = '0';
    elements.cherryCount.value = '0';
    elements.investmentCoins.value = '0';
    elements.recoveryCoins.value = '0';
    elements.resultSection.style.display = 'none';
}

// 履歴に保存
function saveToHistory() {
    const totalGames = parseInt(elements.totalGames.value) || 0;
    const bigCount = parseInt(elements.bigCount.value) || 0;
    const regCount = parseInt(elements.regCount.value) || 0;
    const investment = parseInt(elements.investmentCoins.value) || 0;
    const recovery = parseInt(elements.recoveryCoins.value) || 0;

    if (totalGames === 0 || (bigCount === 0 && regCount === 0)) {
        alert('データを入力してから保存してください');
        return;
    }

    const machineType = elements.machineType.value;
    const machineName = machineData[machineType].name;
    const profit = recovery - investment;

    const historyItem = {
        id: Date.now(),
        date: new Date().toLocaleString('ja-JP'),
        machine: machineName,
        totalGames,
        bigCount,
        regCount,
        investment,
        recovery,
        profit,
        bonusRate: (totalGames / (bigCount + regCount)).toFixed(1),
        recommendedSetting: elements.recommendedSetting.textContent
    };

    // ローカルストレージから既存の履歴を取得
    let history = JSON.parse(localStorage.getItem('jugglerHistory') || '[]');
    history.unshift(historyItem);

    // 最新100件まで保持（件数制限を緩和）
    history = history.slice(0, 100);

    localStorage.setItem('jugglerHistory', JSON.stringify(history));
    saveToIndexedDB(history); // IndexedDBにも保存
    loadHistory();

    alert('データを保存しました');
}

// 履歴を読み込み
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('jugglerHistory') || '[]');
    elements.historyList.innerHTML = '';

    if (history.length === 0) {
        elements.historyList.innerHTML = '<p style="color: #6c757d; text-align: center; padding: 20px;">保存されたデータはありません</p>';
        return;
    }

    history.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'history-item';

        const profitText = item.profit !== undefined
            ? `<br>収支: ${item.profit >= 0 ? '+' : ''}${item.profit}枚 (${item.profit * 20}円)`
            : '';

        itemDiv.innerHTML = `
            <div class="history-item-header">
                <span class="history-date">${item.date}</span>
                <span class="history-delete" onclick="deleteHistory(${item.id})">削除</span>
            </div>
            <div class="history-data">
                <strong>${item.machine}</strong><br>
                総回転: ${item.totalGames}G | BIG: ${item.bigCount} | REG: ${item.regCount}<br>
                合算: 1/${item.bonusRate} | ${item.recommendedSetting}${profitText}
            </div>
        `;

        elements.historyList.appendChild(itemDiv);
    });
}

// 履歴を削除
function deleteHistory(id) {
    let history = JSON.parse(localStorage.getItem('jugglerHistory') || '[]');
    history = history.filter(item => item.id !== id);
    localStorage.setItem('jugglerHistory', JSON.stringify(history));
    saveToIndexedDB(history);
    loadHistory();
}

// 全履歴を削除
function clearAllHistory() {
    if (!confirm('すべての履歴データを削除してもよろしいですか？\nこの操作は取り消せません。')) {
        return;
    }
    localStorage.removeItem('jugglerHistory');
    clearIndexedDB();
    loadHistory();
    alert('すべての履歴を削除しました');
}

// 履歴をJSONファイルとしてエクスポート
function exportHistoryToFile() {
    const history = JSON.parse(localStorage.getItem('jugglerHistory') || '[]');

    if (history.length === 0) {
        alert('エクスポートする履歴データがありません');
        return;
    }

    const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        history: history
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `juggler-history_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('履歴データをエクスポートしました');
}

// JSONファイルから履歴をインポート
function importHistoryFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importData = JSON.parse(e.target.result);

            // データ検証
            if (!importData.history || !Array.isArray(importData.history)) {
                throw new Error('無効なデータ形式です');
            }

            // 既存の履歴を取得
            const existingHistory = JSON.parse(localStorage.getItem('jugglerHistory') || '[]');

            // インポート方法を選択
            const mergeChoice = confirm(
                `${importData.history.length}件のデータが見つかりました。\n\n` +
                '「OK」：既存データに追加\n' +
                '「キャンセル」：既存データを置き換え'
            );

            let newHistory;
            if (mergeChoice) {
                // マージ（重複IDを除外）
                const existingIds = new Set(existingHistory.map(item => item.id));
                const uniqueImports = importData.history.filter(item => !existingIds.has(item.id));
                newHistory = [...existingHistory, ...uniqueImports];
            } else {
                // 置き換え
                newHistory = importData.history;
            }

            // 日付順にソート
            newHistory.sort((a, b) => b.id - a.id);

            // 保存
            localStorage.setItem('jugglerHistory', JSON.stringify(newHistory));
            saveToIndexedDB(newHistory);
            loadHistory();

            alert(`${importData.history.length}件のデータをインポートしました`);
        } catch (error) {
            console.error('インポートエラー:', error);
            alert('データのインポートに失敗しました。\n正しいJSON形式のファイルを選択してください。');
        }
    };

    reader.readAsText(file);
    // ファイル選択をリセット（同じファイルを再度選択できるように）
    event.target.value = '';
}

// ===== IndexedDB による永続化機能 =====
let db = null;
const DB_NAME = 'JugglerHistoryDB';
const DB_VERSION = 1;
const STORE_NAME = 'history';

// IndexedDBを初期化
function initIndexedDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('IndexedDB の初期化に失敗しました');
            reject(request.error);
        };

        request.onsuccess = () => {
            db = request.result;
            console.log('IndexedDB を初期化しました');
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                console.log('IndexedDB オブジェクトストアを作成しました');
            }
        };
    });
}

// IndexedDBにデータを保存
function saveToIndexedDB(history) {
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    // 既存のデータをクリア
    store.clear();

    // 新しいデータを保存
    history.forEach(item => {
        store.put(item);
    });

    transaction.oncomplete = () => {
        console.log('IndexedDB にデータを保存しました');
    };

    transaction.onerror = () => {
        console.error('IndexedDB への保存に失敗しました');
    };
}

// IndexedDBからデータを読み込み
function loadFromIndexedDB() {
    return new Promise((resolve, reject) => {
        if (!db) {
            resolve([]);
            return;
        }

        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result || []);
        };

        request.onerror = () => {
            console.error('IndexedDB からの読み込みに失敗しました');
            reject(request.error);
        };
    });
}

// IndexedDBのデータをクリア
function clearIndexedDB() {
    if (!db) return;

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.clear();

    transaction.oncomplete = () => {
        console.log('IndexedDB のデータをクリアしました');
    };
}

// LocalStorageとIndexedDBを同期
async function syncStorage() {
    try {
        // IndexedDBからデータを読み込み
        const indexedDBData = await loadFromIndexedDB();

        // LocalStorageからデータを読み込み
        const localStorageData = JSON.parse(localStorage.getItem('jugglerHistory') || '[]');

        // より新しいデータを使用
        let finalData;
        if (indexedDBData.length > localStorageData.length) {
            finalData = indexedDBData;
            localStorage.setItem('jugglerHistory', JSON.stringify(finalData));
            console.log('IndexedDB から LocalStorage にデータを復元しました');
        } else if (localStorageData.length > 0) {
            finalData = localStorageData;
            saveToIndexedDB(finalData);
            console.log('LocalStorage から IndexedDB にデータをバックアップしました');
        }
    } catch (error) {
        console.error('ストレージの同期に失敗しました:', error);
    }
}

// ===== 高精度グラフ分析機能 =====
let selectedGraphPattern = null;
let checkpointData = {};

// データランプを開くボタン
const openGraphBtn = document.getElementById('openGraphBtn');
if (openGraphBtn) {
    openGraphBtn.addEventListener('click', () => {
        const hallId = document.getElementById('hallId')?.value || '2193';
        const rackNo = document.getElementById('rackNo')?.value;
        const targetDate = document.getElementById('targetDate')?.value;

        if (!rackNo) {
            alert('台番号を入力してください');
            return;
        }

        if (!targetDate) {
            alert('日付を選択してください');
            return;
        }

        // データランプのURLを生成
        const url = `https://espace.pt.teramoba2.com/shinjukukabukicho/standgraph/?hall_id=${hallId}&rack_no=${rackNo}&date=${targetDate}`;

        // 新しいタブで開く
        window.open(url, '_blank');
    });
}

// スクリーンショット分析機能
const screenshotUpload = document.getElementById('screenshotUpload');
if (screenshotUpload) {
    screenshotUpload.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const resultDiv = document.getElementById('screenshotAnalysisResult');
        if (resultDiv) {
            resultDiv.style.display = 'block';
            resultDiv.innerHTML = '📊 画像を分析中...';
        }

        try {
            // 画像をBase64に変換
            const base64Image = await fileToBase64(file);

            // OCR分析を実行（簡易版：数値パターンマッチング）
            await analyzeScreenshot(base64Image);

        } catch (error) {
            console.error('スクリーンショット分析エラー:', error);
            if (resultDiv) {
                resultDiv.innerHTML = '⚠️ 分析に失敗しました。画像を確認してください。';
            }
        }

        // ファイル選択をリセット
        event.target.value = '';
    });
}

// ファイルをBase64に変換
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// 画像の前処理（コントラスト強化・二値化）
function preprocessImage(base64Image) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            // 画像を描画
            ctx.drawImage(img, 0, 0);

            // ピクセルデータを取得
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // コントラスト強化 + グレースケール化
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // グレースケール化
                const gray = 0.299 * r + 0.587 * g + 0.114 * b;

                // コントラスト強化（二値化）
                const threshold = 128;
                const binary = gray > threshold ? 255 : 0;

                data[i] = binary;     // R
                data[i + 1] = binary; // G
                data[i + 2] = binary; // B
            }

            ctx.putImageData(imageData, 0, 0);

            // Base64に変換して返す
            resolve(canvas.toDataURL('image/png'));
        };
        img.src = base64Image;
    });
}

// グラフ画像からグラフ線を検出して差枚数データを抽出
function extractGraphShape(base64Image) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            // 画像を描画
            ctx.drawImage(img, 0, 0);

            // ピクセルデータを取得
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // グラフ線の色を検出（通常は青や赤などの特定色）
            // データランプのグラフ線の色を検出
            const graphPixels = [];

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const i = (y * canvas.width + x) * 4;
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];

                    // グラフ線の色を検出（青系、赤系、緑系など）
                    // 背景色（白や薄いグレー）を除外
                    const isBright = r > 200 && g > 200 && b > 200;
                    const isDark = r < 50 && g < 50 && b < 50;

                    // グラフ線らしい色（彩度がある色）
                    const maxRGB = Math.max(r, g, b);
                    const minRGB = Math.min(r, g, b);
                    const saturation = maxRGB - minRGB;

                    if (!isBright && !isDark && saturation > 30) {
                        graphPixels.push({ x, y, r, g, b });
                    }
                }
            }

            console.log('グラフ線候補ピクセル数:', graphPixels.length);

            // X座標ごとにグラフのY座標を集計
            const xToY = {};
            graphPixels.forEach(pixel => {
                if (!xToY[pixel.x]) {
                    xToY[pixel.x] = [];
                }
                xToY[pixel.x].push(pixel.y);
            });

            // 各X座標での中央値を取る（ノイズ除去）
            const graphPoints = [];
            Object.keys(xToY).forEach(x => {
                const yValues = xToY[x].sort((a, b) => a - b);
                const medianY = yValues[Math.floor(yValues.length / 2)];
                graphPoints.push({ x: parseInt(x), y: medianY });
            });

            // X座標順にソート
            graphPoints.sort((a, b) => a.x - b.x);

            console.log('グラフポイント数:', graphPoints.length);
            console.log('サンプルポイント:', graphPoints.slice(0, 10));

            // グラフエリアの範囲を推定
            const minX = Math.min(...graphPoints.map(p => p.x));
            const maxX = Math.max(...graphPoints.map(p => p.x));
            const minY = Math.min(...graphPoints.map(p => p.y));
            const maxY = Math.max(...graphPoints.map(p => p.y));

            console.log('グラフ範囲:', { minX, maxX, minY, maxY });

            resolve({
                graphPoints,
                imageWidth: canvas.width,
                imageHeight: canvas.height,
                graphArea: { minX, maxX, minY, maxY }
            });
        };
        img.src = base64Image;
    });
}

// グラフのピクセル座標をゲーム数・差枚数に変換
function convertGraphCoordsToGameData(graphData, totalGames) {
    const { graphPoints, graphArea } = graphData;

    if (graphPoints.length === 0) {
        return [];
    }

    // グラフのX軸範囲を総ゲーム数にマッピング
    const xRange = graphArea.maxX - graphArea.minX;
    const yRange = graphArea.maxY - graphArea.minY;

    // 代表的なポイントを抽出（1000G刻みなど）
    const checkpointIntervals = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
    const extractedCheckpoints = [];

    checkpointIntervals.forEach(targetGames => {
        if (targetGames > totalGames) return;

        // 目標ゲーム数に対応するX座標を計算
        const targetXRatio = targetGames / totalGames;
        const targetX = graphArea.minX + (xRange * targetXRatio);

        // 最も近いグラフポイントを探す
        let closestPoint = null;
        let minDist = Infinity;

        graphPoints.forEach(point => {
            const dist = Math.abs(point.x - targetX);
            if (dist < minDist) {
                minDist = dist;
                closestPoint = point;
            }
        });

        if (closestPoint) {
            // Y座標を差枚数に変換
            // Y座標が小さい = 画像上部 = プラス枚数
            // Y座標が大きい = 画像下部 = マイナス枚数
            const yRatio = (closestPoint.y - graphArea.minY) / yRange;

            // グラフの範囲を推定（通常 ±2000枚程度）
            // Y座標の中央を0枚、上限を+2000、下限を-2000と仮定
            const estimatedCoins = (0.5 - yRatio) * 4000; // -2000 〜 +2000

            extractedCheckpoints.push({
                games: targetGames,
                coins: Math.round(estimatedCoins)
            });

            console.log(`${targetGames}G時点: ${Math.round(estimatedCoins)}枚 (x:${closestPoint.x}, y:${closestPoint.y})`);
        }
    });

    // 現在地点（総ゲーム数）も追加
    const lastPoint = graphPoints[graphPoints.length - 1];
    if (lastPoint) {
        const yRatio = (lastPoint.y - graphArea.minY) / yRange;
        const estimatedCoins = (0.5 - yRatio) * 4000;

        extractedCheckpoints.push({
            games: totalGames,
            coins: Math.round(estimatedCoins)
        });

        console.log(`現在(${totalGames}G): ${Math.round(estimatedCoins)}枚`);
    }

    return extractedCheckpoints;
}

// スクリーンショットを分析（OCR + グラフ形状解析）
async function analyzeScreenshot(base64Image) {
    const resultDiv = document.getElementById('screenshotAnalysisResult');

    try {
        // ステップ1: グラフ形状を解析
        if (resultDiv) {
            resultDiv.innerHTML = '📊 グラフの形状を解析中...';
        }

        const graphData = await extractGraphShape(base64Image);
        console.log('グラフ解析完了:', graphData);

        // ステップ2: OCRで数値を読み取り
        if (resultDiv) {
            resultDiv.innerHTML = '🔍 画像を前処理中...';
        }

        const processedImage = await preprocessImage(base64Image);

        if (resultDiv) {
            resultDiv.innerHTML = '🔍 OCRで数値を解析中... (30秒程度かかります)';
        }

        // Tesseract.jsでOCR実行（前処理済み画像を使用）
        const result = await Tesseract.recognize(
            processedImage,
            'eng+jpn',
            {
                logger: m => {
                    if (m.status === 'recognizing text') {
                        const progress = Math.round(m.progress * 100);
                        if (resultDiv) {
                            resultDiv.innerHTML = `🔍 OCR解析中... ${progress}%`;
                        }
                    }
                }
            }
        );

        const text = result.data.text;
        console.log('OCR結果:', text);

        // テキストから数値を抽出
        const extractedData = extractDataFromOCR(text);

        let ocrSuccess = false;
        let graphSuccess = false;

        // OCRデータを適用
        if (extractedData) {
            applyExtractedData(extractedData);
            ocrSuccess = true;

            // ステップ3: グラフデータを総ゲーム数と組み合わせてチェックポイント抽出
            if (graphData.graphPoints.length > 0) {
                if (resultDiv) {
                    resultDiv.innerHTML = '📈 グラフデータを抽出中...';
                }

                const checkpoints = convertGraphCoordsToGameData(graphData, extractedData.totalGames);
                console.log('抽出されたチェックポイント:', checkpoints);

                if (checkpoints.length > 0) {
                    applyGraphCheckpoints(checkpoints);
                    graphSuccess = true;
                }
            }
        }

        // 結果表示
        if (resultDiv) {
            if (ocrSuccess && graphSuccess) {
                resultDiv.innerHTML = `
                    <strong>✅ 完全自動読み取り成功！</strong><br>
                    <small>📊 総回転数: ${extractedData.totalGames}G / BIG: ${extractedData.bigCount} / REG: ${extractedData.regCount}</small><br>
                    <small>📈 グラフ形状を解析してチェックポイントも自動入力しました</small><br>
                    <small style="color: #51cf66;">「設定を計算」ボタンを押してください。</small><br>
                    <small style="color: #6c757d;">値が間違っている場合は手動で修正してください。</small>
                `;
            } else if (ocrSuccess && !graphSuccess) {
                resultDiv.innerHTML = `
                    <strong>✅ 数値読み取り成功</strong><br>
                    <small>総回転数: ${extractedData.totalGames}G / BIG: ${extractedData.bigCount} / REG: ${extractedData.regCount}</small><br>
                    <small style="color: #ffd43b;">⚠️ グラフ形状の解析に失敗しました</small><br>
                    <small style="color: #51cf66;">基本データは入力済みです。「設定を計算」を押してください。</small>
                `;
            } else {
                // OCR結果から全ての数字を表示（デバッグ用）
                const allNumbers = text.replace(/,/g, '').match(/\d+/g);
                const numbersList = allNumbers ? allNumbers.slice(0, 10).join(', ') : 'なし';

                resultDiv.innerHTML = `
                    <strong>⚠️ 自動読み取りに失敗</strong><br>
                    <small>検出された数字: ${numbersList}</small><br>
                    <small>グラフポイント数: ${graphData.graphPoints.length}</small><br>
                    <small>画像が不鮮明か、データランプのスクリーンショットではない可能性があります。</small><br>
                    <small style="color: #ff6b6b;">手動で数値を入力してください。</small>
                `;
            }
        }

    } catch (error) {
        console.error('スクリーンショット解析エラー:', error);
        if (resultDiv) {
            resultDiv.innerHTML = '⚠️ 解析処理でエラーが発生しました。手動で入力してください。';
        }
    }
}

// OCR結果からデータを抽出（改良版）
function extractDataFromOCR(text) {
    console.log('OCR生テキスト:', text);

    // OCRの誤認識を補正（O→0, l→1, I→1など）
    const cleanedText = text
        .replace(/O/g, '0')
        .replace(/[Il|]/g, '1')
        .replace(/[Ss\$]/g, '5')
        .replace(/[Zz]/g, '2')
        .replace(/B/g, '8');

    // 数字のみを抽出（カンマ区切りにも対応）
    const numbers = cleanedText.replace(/,/g, '').match(/\d+/g);
    if (!numbers || numbers.length < 3) {
        console.log('数字が3つ未満のため失敗');
        return null;
    }

    const numArray = numbers.map(n => parseInt(n));
    console.log('抽出された数字:', numArray);

    let totalGames = null;
    let bigCount = null;
    let regCount = null;

    // 方法1: キーワードベースの抽出（複数パターン対応）
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // 総回転数パターン（複数形式に対応）
        if (/総回|回転|ゲーム数|総.*?回/i.test(line)) {
            const match = line.match(/(\d{3,5})/);
            if (match && !totalGames) {
                totalGames = parseInt(match[1]);
                console.log('総回転数検出:', totalGames, 'from:', line);
            }
        }

        // BIGパターン
        if (/BIG|ビッグ|ビツグ|big/i.test(line)) {
            const match = line.match(/(\d{1,3})/);
            if (match && !bigCount) {
                bigCount = parseInt(match[1]);
                console.log('BIG検出:', bigCount, 'from:', line);
            }
        }

        // REGパターン
        if (/REG|レギュラー|レグ|reg/i.test(line)) {
            const match = line.match(/(\d{1,3})/);
            if (match && !regCount) {
                regCount = parseInt(match[1]);
                console.log('REG検出:', regCount, 'from:', line);
            }
        }
    }

    // 方法2: パターンマッチングでより柔軟に検索
    if (!totalGames) {
        // 3桁以上の大きな数字を総回転数と推定
        const largeNumbers = numArray.filter(n => n >= 100 && n < 20000);
        if (largeNumbers.length > 0) {
            totalGames = Math.max(...largeNumbers);
            console.log('総回転数を推定:', totalGames);
        }
    }

    if (!bigCount || !regCount) {
        // 1〜2桁の小さな数字をBIG/REGと推定
        const smallNumbers = numArray.filter(n => n >= 0 && n < 100 && n !== totalGames);
        console.log('小さい数字（BIG/REG候補）:', smallNumbers);

        if (smallNumbers.length >= 2) {
            // BIGとREGは通常近い値だが、BIG<REGが多い
            if (!bigCount) bigCount = Math.min(...smallNumbers);
            if (!regCount) regCount = Math.max(...smallNumbers);
            console.log('BIG/REGを推定:', 'BIG:', bigCount, 'REG:', regCount);
        } else if (smallNumbers.length === 1) {
            // 1つしかない場合は両方同じと推定（暫定）
            if (!bigCount) bigCount = smallNumbers[0];
            if (!regCount) regCount = smallNumbers[0];
        }
    }

    // 方法3: スクリーンショット特有のパターンに対応
    // 「3166」「9」「10」のような並びを検出
    if (numArray.length >= 3 && !totalGames) {
        // 最も大きい数字を総回転、次に小さい2つをBIG/REG
        const sorted = [...numArray].sort((a, b) => b - a);
        if (sorted[0] >= 1000 && sorted[1] < 100 && sorted[2] < 100) {
            totalGames = sorted[0];
            bigCount = sorted[2]; // 小さい方
            regCount = sorted[1]; // 大きい方
            console.log('パターン3で推定:', { totalGames, bigCount, regCount });
        }
    }

    // 検証：妥当な値かチェック
    console.log('最終結果:', { totalGames, bigCount, regCount });

    if (totalGames && bigCount !== null && regCount !== null) {
        // より柔軟な検証
        if (totalGames >= 100 && totalGames <= 20000 &&
            bigCount >= 0 && bigCount <= 300 &&
            regCount >= 0 && regCount <= 300 &&
            bigCount + regCount > 0) { // 合計が0でないことを確認

            // 合算確率が妥当かチェック（1/50〜1/300の範囲）
            const bonusRate = totalGames / (bigCount + regCount);
            if (bonusRate >= 50 && bonusRate <= 500) {
                console.log('✅ データ抽出成功');
                return {
                    totalGames: totalGames,
                    bigCount: bigCount,
                    regCount: regCount
                };
            } else {
                console.log('❌ 合算確率が異常:', bonusRate);
            }
        }
    }

    console.log('❌ データ抽出失敗');
    return null;
}

// 抽出したデータをフォームに自動入力
function applyExtractedData(data) {
    // 総ゲーム数
    const totalGamesInput = document.getElementById('totalGames');
    if (totalGamesInput) {
        totalGamesInput.value = data.totalGames;
    }

    // BIG回数
    const bigCountInput = document.getElementById('bigCount');
    if (bigCountInput) {
        bigCountInput.value = data.bigCount;
    }

    // REG回数
    const regCountInput = document.getElementById('regCount');
    if (regCountInput) {
        regCountInput.value = data.regCount;
    }

    // 入力イベントをトリガー（バリデーション等があれば）
    [totalGamesInput, bigCountInput, regCountInput].forEach(input => {
        if (input) {
            input.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
}

// グラフチェックポイントデータをフォームに自動入力
function applyGraphCheckpoints(checkpoints) {
    console.log('チェックポイントを自動入力:', checkpoints);

    checkpoints.forEach(cp => {
        const { games, coins } = cp;

        // 各ゲーム数に対応する入力フィールドを探して設定
        if (games === 1000) {
            const input = document.getElementById('checkpoint1000');
            if (input) input.value = coins;
        } else if (games === 2000) {
            const input = document.getElementById('checkpoint2000');
            if (input) input.value = coins;
        } else if (games === 3000) {
            const input = document.getElementById('checkpoint3000');
            if (input) input.value = coins;
        } else if (games === 4000) {
            const input = document.getElementById('checkpoint4000');
            if (input) input.value = coins;
        } else if (games === 5000) {
            const input = document.getElementById('checkpoint5000');
            if (input) input.value = coins;
        } else if (games === 6000) {
            const input = document.getElementById('checkpoint6000');
            if (input) input.value = coins;
        } else if (games === 7000) {
            const input = document.getElementById('checkpoint7000');
            if (input) input.value = coins;
        } else if (games === 8000) {
            const input = document.getElementById('checkpoint8000');
            if (input) input.value = coins;
        } else {
            // 現在地点（総ゲーム数）
            const input = document.getElementById('checkpointCurrent');
            if (input) input.value = coins;
        }
    });

    // グラフ分析を再実行
    analyzeGraphFromCheckpoints();
}

// チェックポイント入力の監視（開始時点も含む）
['startGames', 'startCoins', 'checkpoint1000', 'checkpoint2000', 'checkpoint3000', 'checkpoint4000', 'checkpoint5000', 'checkpoint6000', 'checkpoint7000', 'checkpoint8000', 'checkpointCurrent'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        input.addEventListener('input', () => {
            analyzeGraphFromCheckpoints();
        });
    }
});

// グラフパターンタグの選択
document.querySelectorAll('.pattern-tag').forEach(btn => {
    btn.addEventListener('click', function() {
        // トグル動作（複数選択可能）
        this.classList.toggle('selected');

        // 選択されたパターンを収集
        const selectedPatterns = Array.from(document.querySelectorAll('.pattern-tag.selected'))
            .map(tag => tag.dataset.pattern);

        selectedGraphPattern = selectedPatterns.length > 0 ? selectedPatterns : null;

        // 再分析
        analyzeGraphFromCheckpoints();
    });
});

// チェックポイントデータからグラフを分析
function analyzeGraphFromCheckpoints() {
    // 開始時点を取得
    const startGames = parseInt(document.getElementById('startGames')?.value) || 0;
    const startCoins = parseFloat(document.getElementById('startCoins')?.value) || 0;

    // 総ゲーム数を取得
    const totalGames = parseInt(document.getElementById('totalGames')?.value) || 0;

    // チェックポイントを構築（開始時点からの相対値）
    const checkpoints = [];

    // 開始時点を追加
    if (startGames >= 0 && startCoins !== null) {
        checkpoints.push({ games: startGames, coins: startCoins });
    }

    // 各時点のチェックポイントを追加（絶対値）
    const checkpointGames = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];

    checkpointGames.forEach(games => {
        const coins = parseFloat(document.getElementById(`checkpoint${games}`)?.value);
        if (coins !== null && !isNaN(coins)) {
            checkpoints.push({
                games: games,
                coins: coins
            });
        }
    });

    // 現在地点を追加
    const currentCoins = parseFloat(document.getElementById('checkpointCurrent')?.value);
    if (currentCoins !== null && !isNaN(currentCoins) && totalGames > 0) {
        checkpoints.push({ games: totalGames, coins: currentCoins });
    }

    // ゲーム数順にソート
    checkpoints.sort((a, b) => a.games - b.games);

    // 重複を除去（同じゲーム数なら最新のものを使用）
    const uniqueCheckpoints = [];
    const seenGames = new Set();
    for (let i = checkpoints.length - 1; i >= 0; i--) {
        if (!seenGames.has(checkpoints[i].games)) {
            uniqueCheckpoints.unshift(checkpoints[i]);
            seenGames.add(checkpoints[i].games);
        }
    }

    if (uniqueCheckpoints.length < 2) {
        // データ不足
        const displayArea = document.getElementById('graphAnalysisDisplay');
        if (displayArea) {
            displayArea.style.display = 'none';
        }
        localStorage.removeItem('latestGraphTrend');
        return;
    }

    // グラフ分析を実行
    const analysis = performAdvancedGraphAnalysis(uniqueCheckpoints, selectedGraphPattern, startGames);

    // 結果を表示
    displayGraphAnalysis(analysis);

    // ローカルストレージに保存
    localStorage.setItem('latestGraphTrend', JSON.stringify(analysis));

    console.log('高精度グラフ分析結果:', analysis);
}

// 高精度グラフ分析アルゴリズム
function performAdvancedGraphAnalysis(checkpoints, patterns, startGames = 0) {
    const n = checkpoints.length;

    // 1. 線形回帰で傾きを計算
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    checkpoints.forEach(cp => {
        sumX += cp.games;
        sumY += cp.coins;
        sumXY += cp.games * cp.coins;
        sumX2 += cp.games * cp.games;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // 2. R² (決定係数) を計算 - グラフの直線性
    const meanY = sumY / n;
    let ssTotal = 0, ssResidual = 0;
    checkpoints.forEach(cp => {
        const predicted = slope * cp.games + intercept;
        ssTotal += Math.pow(cp.coins - meanY, 2);
        ssResidual += Math.pow(cp.coins - predicted, 2);
    });
    const r2 = 1 - (ssResidual / ssTotal);

    // 3. 標準偏差（波の激しさ）
    let variance = 0;
    checkpoints.forEach(cp => {
        const predicted = slope * cp.games + intercept;
        variance += Math.pow(cp.coins - predicted, 2);
    });
    const stdDev = Math.sqrt(variance / n);

    // 4. 前半・後半の比較
    const midIndex = Math.floor(n / 2);
    const firstHalf = checkpoints.slice(0, midIndex);
    const secondHalf = checkpoints.slice(midIndex);

    const firstAvg = firstHalf.reduce((sum, cp) => sum + cp.coins, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, cp) => sum + cp.coins, 0) / secondHalf.length;
    const momentum = secondAvg - firstAvg;

    // 5. 最高点・最低点
    const maxCoins = Math.max(...checkpoints.map(cp => cp.coins));
    const minCoins = Math.min(...checkpoints.map(cp => cp.coins));

    // 6. 最終位置と自分が打った区間
    const finalCoins = checkpoints[n - 1].coins;
    const finalGames = checkpoints[n - 1].games;
    const startingCoins = checkpoints[0].coins;

    // 自分が打った区間の増減（途中から打った場合に重要）
    const mySessionChange = finalCoins - startingCoins;
    const mySessionGames = finalGames - checkpoints[0].games;

    // 7. 傾向判定
    let trend, message, settingBonus = 0;

    // 1枚/1Gあたりの傾きに正規化
    const slopePerGame = slope;

    // 途中から打った場合の補足情報
    const isMidSession = startGames > 0;
    const mySessionSlopePerGame = mySessionGames > 0 ? mySessionChange / mySessionGames : 0;

    // 傾きベースの基本判定
    if (slopePerGame > 0.15) {
        trend = 'strong-rising';
        message = '📈 強い右肩上がり（高設定濃厚）';
        settingBonus = 35;
    } else if (slopePerGame > 0.05) {
        trend = 'rising';
        message = '📈 右肩上がり（高設定の可能性大）';
        settingBonus = 25;
    } else if (slopePerGame > -0.05) {
        trend = 'flat';
        message = '➡️ 横ばい（設定4〜5の可能性）';
        settingBonus = 0;
    } else if (slopePerGame > -0.15) {
        trend = 'falling';
        message = '📉 右肩下がり（低設定の可能性）';
        settingBonus = -25;
    } else {
        trend = 'strong-falling';
        message = '⚠️ 強い右肩下がり（低設定濃厚）';
        settingBonus = -35;
    }

    // モメンタム補正（後半の勢い）
    if (momentum > 200 && slopePerGame > 0) {
        message += '\n✅ 後半加速（高設定の強い兆候）';
        settingBonus += 20;
    } else if (momentum > 100 && slopePerGame > -0.05) {
        message += '\n✅ 後半盛り返し（設定期待度UP）';
        settingBonus += 15;
    } else if (momentum < -200 && slopePerGame < 0) {
        message += '\n⚠️ 後半失速（低設定の強い兆候）';
        settingBonus -= 20;
    } else if (momentum < -100) {
        message += '\n⚠️ 後半下降（注意）';
        settingBonus -= 15;
    }

    // 直線性の評価（R²が高い = 安定している）
    if (r2 > 0.8 && slopePerGame > 0.05) {
        message += '\n📊 安定した上昇（信頼性高）';
        settingBonus += 10;
    } else if (r2 < 0.3) {
        message += '\n🌊 波が激しい（ムラ大）';
        // 波が激しいのは判定に影響しにくい
    }

    // 最終位置の評価
    if (finalCoins > 500 && finalGames >= 300) {
        message += '\n💰 大幅プラス（高設定期待）';
        settingBonus += 15;
    } else if (finalCoins < -500 && finalGames >= 300) {
        message += '\n💸 大幅マイナス（低設定警戒）';
        settingBonus -= 15;
    }

    // パターンタグによる補正
    if (patterns && patterns.length > 0) {
        patterns.forEach(pattern => {
            switch (pattern) {
                case 'stable-rise':
                    settingBonus += 10;
                    break;
                case 'late-recovery':
                    settingBonus += 15;
                    break;
                case 'early-peak':
                    settingBonus -= 5;
                    break;
                case 'wave-high':
                    // 波が激しいだけでは判定しにくい
                    break;
                case 'stable-flat':
                    settingBonus += 5;
                    break;
                case 'late-collapse':
                    settingBonus -= 20;
                    break;
            }
        });
    }

    // ボーナス上限を設定（過剰補正を防ぐ）
    settingBonus = Math.max(-50, Math.min(50, settingBonus));

    return {
        trend,
        message,
        settingBonus,
        slope: slopePerGame,
        r2: r2,
        stdDev: stdDev,
        momentum: momentum,
        maxCoins: maxCoins,
        minCoins: minCoins,
        finalCoins: finalCoins,
        finalGames: finalGames,
        checkpointCount: checkpoints.length,
        // 途中から打った場合の追加情報
        isMidSession: isMidSession,
        mySessionChange: mySessionChange,
        mySessionGames: mySessionGames,
        mySessionSlopePerGame: mySessionSlopePerGame,
        startingCoins: startingCoins
    };
}

// グラフ分析結果の表示
function displayGraphAnalysis(analysis) {
    const displayArea = document.getElementById('graphAnalysisDisplay');
    if (!displayArea) return;

    // 途中から打った場合の追加情報
    let midSessionInfo = '';
    if (analysis.isMidSession && analysis.mySessionGames > 0) {
        const sessionSign = analysis.mySessionChange > 0 ? '+' : '';
        const sessionColor = analysis.mySessionChange > 0 ? '#51cf66' : analysis.mySessionChange < -100 ? '#ff6b6b' : '#ffd43b';
        midSessionInfo = `
            <div style="margin-top: 12px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 6px; border-left: 3px solid ${sessionColor};">
                <div style="font-size: 11px; opacity: 0.9; margin-bottom: 4px;">📍 あなたが打った区間</div>
                <div style="font-weight: 700; font-size: 14px;">
                    ${analysis.mySessionGames}G消化 → ${sessionSign}${analysis.mySessionChange.toFixed(0)}枚
                    <span style="font-size: 12px; opacity: 0.8;">(${(analysis.mySessionSlopePerGame * 100).toFixed(2)}枚/100G)</span>
                </div>
                <div style="font-size: 10px; opacity: 0.8; margin-top: 4px;">
                    開始: ${analysis.startingCoins > 0 ? '+' : ''}${analysis.startingCoins.toFixed(0)}枚 → 現在: ${analysis.finalCoins > 0 ? '+' : ''}${analysis.finalCoins.toFixed(0)}枚
                </div>
            </div>
        `;
    }

    displayArea.style.display = 'block';
    displayArea.innerHTML = `
        <div style="padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
            <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">📊 グラフ分析結果</h3>
            <div style="background: rgba(255,255,255,0.15); padding: 12px; border-radius: 6px; margin-bottom: 12px; white-space: pre-line; line-height: 1.6;">
                ${analysis.message}
            </div>
            ${midSessionInfo}
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 12px; margin-top: 12px;">
                <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 4px;">
                    <div style="opacity: 0.8;">全体傾き</div>
                    <div style="font-weight: 700; font-size: 14px;">${(analysis.slope * 100).toFixed(2)}枚/100G</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 4px;">
                    <div style="opacity: 0.8;">直線性</div>
                    <div style="font-weight: 700; font-size: 14px;">${(analysis.r2 * 100).toFixed(0)}%</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 4px;">
                    <div style="opacity: 0.8;">後半勢い</div>
                    <div style="font-weight: 700; font-size: 14px;">${analysis.momentum > 0 ? '+' : ''}${analysis.momentum.toFixed(0)}枚</div>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 8px; border-radius: 4px;">
                    <div style="opacity: 0.8;">現在位置</div>
                    <div style="font-weight: 700; font-size: 14px;">${analysis.finalCoins > 0 ? '+' : ''}${analysis.finalCoins.toFixed(0)}枚</div>
                </div>
            </div>
            <div style="margin-top: 12px; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 6px; font-size: 11px; opacity: 0.9;">
                <strong>設定判別への影響:</strong> ${analysis.settingBonus > 0 ? '+' : ''}${analysis.settingBonus}ポイント<br>
                データ点数: ${analysis.checkpointCount}点 / 信頼性: ${analysis.checkpointCount >= 5 ? '高' : analysis.checkpointCount >= 3 ? '中' : '低'}
            </div>
        </div>
    `;
}

// ページ読み込み時の処理
window.addEventListener('load', async () => {
    // 機種データを読み込む
    await loadMachineData();

    // IndexedDBを初期化
    try {
        await initIndexedDB();
        await syncStorage();
    } catch (error) {
        console.error('IndexedDB の初期化エラー:', error);
    }

    // 日付を当日に設定
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    const targetDateInput = document.getElementById('targetDate');
    if (targetDateInput) {
        targetDateInput.value = dateString;
    }

    // PWAとして動作させるための基本設定
    if ('serviceWorker' in navigator) {
        // サービスワーカーは今回は省略
    }

    // 画面の向きをロック（縦向き推奨）
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch(() => {
            // エラーは無視
        });
    }
});
