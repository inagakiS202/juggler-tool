// ジャグラー機種データ
const machineData = {
    myJuggler5: {
        name: 'マイジャグラーV',
        settings: {
            1: { big: 1/287.4, reg: 1/431.2, grape: 1/6.35, bonus: 1/172.5 },
            2: { big: 1/282.5, reg: 1/364.1, grape: 1/6.30, bonus: 1/159.1 },
            3: { big: 1/273.1, reg: 1/341.3, grape: 1/6.25, bonus: 1/151.7 },
            4: { big: 1/264.3, reg: 1/292.6, grape: 1/6.23, bonus: 1/138.9 },
            5: { big: 1/252.1, reg: 1/277.7, grape: 1/6.18, bonus: 1/132.1 },
            6: { big: 1/240.9, reg: 1/240.9, grape: 1/6.07, bonus: 1/120.5 }
        }
    },
    goGo5: {
        name: 'ゴーゴージャグラー3',
        settings: {
            1: { big: 1/276.2, reg: 1/399.6, grape: 1/6.35, bonus: 1/163.4 },
            2: { big: 1/266.4, reg: 1/348.6, grape: 1/6.30, bonus: 1/151.0 },
            3: { big: 1/256.0, reg: 1/315.1, grape: 1/6.25, bonus: 1/141.3 },
            4: { big: 1/252.1, reg: 1/292.6, grape: 1/6.23, bonus: 1/135.4 },
            5: { big: 1/241.0, reg: 1/273.1, grape: 1/6.18, bonus: 1/128.0 },
            6: { big: 1/229.1, reg: 1/229.1, grape: 1/6.07, bonus: 1/114.6 }
        }
    },
    happy: {
        name: 'ハッピージャグラーV III',
        settings: {
            1: { big: 1/303.4, reg: 1/528.5, grape: 1/6.49, bonus: 1/192.9 },
            2: { big: 1/297.9, reg: 1/442.8, grape: 1/6.35, bonus: 1/178.0 },
            3: { big: 1/280.1, reg: 1/390.1, grape: 1/6.25, bonus: 1/163.2 },
            4: { big: 1/268.6, reg: 1/334.4, grape: 1/6.18, bonus: 1/149.2 },
            5: { big: 1/252.1, reg: 1/287.4, grape: 1/6.07, bonus: 1/134.3 },
            6: { big: 1/240.9, reg: 1/240.9, grape: 1/6.00, bonus: 1/120.5 }
        }
    }
};

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

    // 設定推測を計算
    const machineType = elements.machineType.value;
    const machine = machineData[machineType];
    const probabilities = calculateProbabilities(machine, actualBonusRate, actualBigRate, actualRegRate, actualGrapeRate, totalGames);

    // グラフを表示
    displaySettingGraph(probabilities);

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

// 設定グラフを表示
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

    // 最新10件のみ保持
    history = history.slice(0, 10);

    localStorage.setItem('jugglerHistory', JSON.stringify(history));
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
    loadHistory();
}

// ページ読み込み時の処理
window.addEventListener('load', () => {
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
