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

// ===== カメラOCR機能 =====
let cameraStream = null;
const cameraElements = {
    startBtn: document.getElementById('startCameraBtn'),
    stopBtn: document.getElementById('stopCameraBtn'),
    retakeBtn: document.getElementById('retakeBtn'),
    container: document.getElementById('cameraContainer'),
    video: document.getElementById('cameraPreview'),
    canvas: document.getElementById('snapshotCanvas'),
    capturedContainer: document.getElementById('capturedImageContainer'),
    capturedImage: document.getElementById('capturedImage'),
    status: document.getElementById('ocrStatus')
};

// カメラ起動
cameraElements.startBtn.addEventListener('click', async () => {
    try {
        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment', // 背面カメラを使用
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            }
        });

        cameraElements.video.srcObject = cameraStream;
        cameraElements.container.style.display = 'block';
        cameraElements.startBtn.style.display = 'none';
        cameraElements.stopBtn.style.display = 'block';
        cameraElements.capturedContainer.style.display = 'none';
        cameraElements.status.textContent = 'カメラ起動中...';

        // ビデオ再生開始を待つ
        await cameraElements.video.play();
        cameraElements.status.textContent = '画面をタップして撮影してください';

    } catch (error) {
        console.error('カメラエラー:', error);
        cameraElements.status.textContent = 'カメラへのアクセスに失敗しました';
        alert('カメラへのアクセスを許可してください');
    }
});

// 画面タップで撮影
cameraElements.video.addEventListener('click', captureSnapshot);

function captureSnapshot() {
    if (!cameraStream) return;

    // キャンバスにビデオフレームを描画
    const video = cameraElements.video;
    const canvas = cameraElements.canvas;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    // 画像データを取得
    const imageData = canvas.toDataURL('image/png');

    // カメラを停止
    stopCamera();

    // 撮影した画像を表示
    cameraElements.capturedImage.src = imageData;
    cameraElements.capturedContainer.style.display = 'block';
    cameraElements.retakeBtn.style.display = 'block';
    cameraElements.status.textContent = '画像を解析中...';

    // OCR処理を実行
    recognizeData(imageData);
}

// カメラ停止
cameraElements.stopBtn.addEventListener('click', stopCamera);
cameraElements.retakeBtn.addEventListener('click', () => {
    cameraElements.retakeBtn.style.display = 'none';
    cameraElements.capturedContainer.style.display = 'none';
    cameraElements.startBtn.click(); // 再度カメラ起動
});

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    cameraElements.container.style.display = 'none';
    cameraElements.startBtn.style.display = 'block';
    cameraElements.stopBtn.style.display = 'none';
    cameraElements.video.srcObject = null;
}

// グラフ画像分析（傾向検出）
async function recognizeData(imageSrc) {
    cameraElements.status.textContent = 'グラフを解析中...';

    try {
        // 画像をキャンバスに読み込み
        const img = new Image();
        img.src = imageSrc;

        await new Promise((resolve) => {
            img.onload = resolve;
        });

        // 解析用キャンバスを作成
        const analysisCanvas = document.createElement('canvas');
        const ctx = analysisCanvas.getContext('2d');
        analysisCanvas.width = img.width;
        analysisCanvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // グラフの傾向を分析
        const graphTrend = analyzeGraphTrend(ctx, img.width, img.height);

        // 結果を表示
        displayGraphAnalysis(graphTrend);

        cameraElements.status.textContent = '✓ グラフ解析完了！';

    } catch (error) {
        console.error('グラフ解析エラー:', error);
        cameraElements.status.textContent = '✗ グラフ解析に失敗しました';
    }
}

// グラフの傾向を画像から分析
function analyzeGraphTrend(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // グラフのライン検出（簡易版）
    // 各列（横方向）で最も濃い色（グラフライン）のY座標を検出
    const graphPoints = [];
    const sampleInterval = Math.floor(width / 50); // 50ポイントでサンプリング

    for (let x = 0; x < width; x += sampleInterval) {
        let maxIntensity = 0;
        let graphY = -1;

        // 縦方向にスキャンして最も濃いピクセルを探す
        for (let y = 0; y < height; y++) {
            const index = (y * width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            // グラフラインは通常、色が濃い（RGBが低い、または特定色）
            // 背景との差分で判定
            const intensity = 255 - (r + g + b) / 3;

            if (intensity > maxIntensity && intensity > 50) {
                maxIntensity = intensity;
                graphY = y;
            }
        }

        if (graphY !== -1) {
            // Y座標を反転（画像では上が0、グラフでは下が0）
            graphPoints.push({ x: x, y: height - graphY });
        }
    }

    if (graphPoints.length < 10) {
        return {
            trend: 'unknown',
            slope: 0,
            volatility: 0,
            message: 'グラフを検出できませんでした'
        };
    }

    // 線形回帰で傾きを計算
    const n = graphPoints.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

    graphPoints.forEach(point => {
        sumX += point.x;
        sumY += point.y;
        sumXY += point.x * point.y;
        sumX2 += point.x * point.x;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    // 標準偏差（波の激しさ）を計算
    let sumSquaredDiff = 0;
    graphPoints.forEach(point => {
        const predicted = slope * point.x + intercept;
        sumSquaredDiff += Math.pow(point.y - predicted, 2);
    });
    const volatility = Math.sqrt(sumSquaredDiff / n);

    // 前半・後半の比較
    const midIndex = Math.floor(graphPoints.length / 2);
    const firstHalf = graphPoints.slice(0, midIndex);
    const secondHalf = graphPoints.slice(midIndex);

    const firstAvg = firstHalf.reduce((sum, p) => sum + p.y, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, p) => sum + p.y, 0) / secondHalf.length;

    // 傾向を判定
    let trend, message, settingBonus = 0;

    const normalizedSlope = slope / height * 100; // パーセンテージ化

    if (normalizedSlope > 2) {
        trend = 'rising';
        message = '📈 右肩上がり（高設定の可能性大）';
        settingBonus = 20; // 設定推測にボーナス
    } else if (normalizedSlope > 0.5) {
        trend = 'slightly_rising';
        message = '📊 やや上昇傾向（中〜高設定の可能性）';
        settingBonus = 10;
    } else if (normalizedSlope > -0.5) {
        trend = 'flat';
        message = '➡️ 横ばい（設定判別には他の要素も重要）';
        settingBonus = 0;
    } else if (normalizedSlope > -2) {
        trend = 'slightly_falling';
        message = '📉 やや下降傾向（低〜中設定の可能性）';
        settingBonus = -10;
    } else {
        trend = 'falling';
        message = '⚠️ 右肩下がり（低設定の可能性大）';
        settingBonus = -20;
    }

    // 後半失速の検出
    if (secondAvg < firstAvg * 0.7 && normalizedSlope < 0) {
        message += '\n⚠️ 後半失速が確認されました（低設定の兆候）';
        settingBonus -= 15;
    } else if (secondAvg > firstAvg * 1.3) {
        message += '\n✅ 後半伸びが確認されました（高設定の兆候）';
        settingBonus += 15;
    }

    // 波の激しさ
    if (volatility > height * 0.1) {
        message += '\n🌊 波が激しい（ムラが大きい）';
    }

    return {
        trend,
        slope: normalizedSlope,
        volatility: volatility / height * 100,
        message,
        settingBonus,
        graphPoints // デバッグ用
    };
}

// グラフ分析結果を表示
function displayGraphAnalysis(analysis) {
    // 既存の分析結果があれば削除
    const existingAnalysis = document.getElementById('graphAnalysisResult');
    if (existingAnalysis) {
        existingAnalysis.remove();
    }

    // 結果表示エリアを作成
    const resultDiv = document.createElement('div');
    resultDiv.id = 'graphAnalysisResult';
    resultDiv.style.cssText = `
        margin-top: 16px;
        padding: 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 8px;
        color: white;
    `;

    resultDiv.innerHTML = `
        <h3 style="margin: 0 0 12px 0; font-size: 16px;">グラフ傾向分析</h3>
        <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 6px; white-space: pre-line;">
            ${analysis.message}
        </div>
        <div style="margin-top: 12px; font-size: 13px; opacity: 0.9;">
            傾き: ${analysis.slope.toFixed(2)}% | 波の大きさ: ${analysis.volatility.toFixed(1)}%
        </div>
        <div style="margin-top: 8px; font-size: 12px; opacity: 0.8;">
            ※この分析は参考情報です。実際のデータ入力と併せてご利用ください。
        </div>
    `;

    // カメラセクションの後に挿入
    const cameraSection = document.querySelector('.camera-section');
    cameraSection.appendChild(resultDiv);

    // グラフ傾向をローカルストレージに保存（判別時に使用）
    localStorage.setItem('latestGraphTrend', JSON.stringify(analysis));

    console.log('グラフ分析結果:', analysis);
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
