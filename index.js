// 1. 1 + 2 + 3 + ... + M
// 2. 1 + 2 - 3 + 4 - 5 ... +- M
// 3. Bilangan Prima
// 4. Tahun kabisat
// 5. KPK, FPB
// 6. Permutasi dan kombinatorik
// 7. SELAMAT , jumlah huruf 'A'
// 8. Kalkulator +, -, *, /

const inputVariable = document.getElementById('M');
const input3 = document.getElementById('input3');
const input4 = document.getElementById('input4');
const input5 = document.getElementById('input5');
const input6 = document.getElementById('input6');
const input7 = document.getElementById('input7');
const input7search = document.getElementById('input7search');
const ans1 = document.getElementById('ans1');
const ans2 = document.getElementById('ans2');
const ans3 = document.getElementById('ans3');
const ans4 = document.getElementById('ans4');
const ans5 = document.getElementById('ans5');
const ans6 = document.getElementById('ans6');
const ans7 = document.getElementById('ans7');

const isPrime = (n) => {
    // Check if n=1 or n=0
    if (n <= 1) return false;
    // Check if n=2 or n=3
    if (n == 2 || n == 3) return true;
    // Check whether n is divisible by 2 or 3
    if (n % 2 == 0 || n % 3 == 0) return false;
    // Check from 5 to square root of n
    // Iterate i by (i+6)
    for (let i = 5; i <= Math.sqrt(n); i = i + 6)
        if (n % i == 0 || n % (i + 2) == 0) return false;

    return true;
};

const isLeapYear = (year) =>
    (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

const gcd = (a, b) => {
    while (b != 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

const findGCD = (...arr) => {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(arr[i], result);

        if (result == 1) {
            return 1;
        }
    }
    return result;
};

const permute = (permutation) => {
    let length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1,
        k,
        p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
};

const lcm = (a, b) => (a * b) / gcd(a, b);

const lcmm = (...args) => {
    if (args.length === 2) {
        return lcm(args[0], args[1]);
    } else {
        let arg0 = args[0];
        args.shift();
        return lcm(arg0, lcmm(args));
    }
};

inputVariable.addEventListener('input', () => {
    const M = +inputVariable.value;
    const res = [...Array(M)].map((_, i) => i + 1);
    ans1.innerHTML = res.join(' + ') + ` = ${res.reduce((a, b) => a + b, 0)}`;
    ans2.innerHTML =
        res.reduce(
            (a, b, i) => (i ? a + (i % 2 === 1 ? ' + ' : ' - ') + b : b),
            '',
        ) +
        ` = ${res.reduce(
            (a, b, i) => (i === 0 || i % 2 === 1 ? a + b : a - b),
            0,
        )}`;
});

input3.addEventListener('input', () => {
    const num = +input3.value || 0;
    ans3.innerHTML = isPrime(num)
        ? `${num} adalah bilangan prima`
        : `${num} bukan bilangan prima`;
});

input4.addEventListener('input', () => {
    const year = +input4.value || 0;
    ans4.innerHTML = isLeapYear(year)
        ? `${year} adalah tahun kabisat`
        : `${year} bukan tahun kabisat`;
});

input5.addEventListener('input', () => {
    const nums = input5.value.split(/\s+/).map((s) => +s);
    const gcd = findGCD(...nums);
    const lcm = lcmm(...nums);
    ans5.innerHTML = `KPK = ${lcm} FPB = ${gcd}`;
});

const question7Handler = () => {
    const s = input7.value;
    const search = input7search.value;
    ans7.innerHTML = `Terdapat ${
        s.split(search).length - 1
    } kali kemunculan "${search}" pada input`;
}

input7.addEventListener('input', question7Handler);

input7search.addEventListener('input', question7Handler);

const calcNumbers = document.querySelectorAll('[data-number]');
const calcOps = document.querySelectorAll('[data-operator]');
const screen = document.querySelector('[data-screen]');
const equals = document.querySelector('[data-equals]');
const clear = document.querySelector('[data-clear]');
const point = document.querySelector('[data-point]');
const delBtn = document.querySelector('[data-delete]');

let firstOp = '';
let secondOp = '';
let curOp = null;

let shouldResetScr = false;
let enteredNum = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, b, op) => {
    a = Number(a);
    b = Number(b);
    switch (op) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            if (b !== 0) {
                return divide(a, b);
            } else {
                return NaN;
            }
            break;
        default:
            return NaN;
            break;
    }
};

const reset = () => {
    firstOp = '';
    secondOp = '';
    curOp = null;
    screen.textContent = '';
    shouldResetScr = true;
}

const pushNumber = (a) => {
    if (screen.textContent.length === 1 && screen.textContent[0] === '0') {
        if (a === '0') return;
        screen.textContent = '';
    }
    if (curOp && shouldResetScr) screen.textContent = '';
    screen.textContent += a;
    shouldResetScr = false;
    enteredNum = true;
}

const pushPoint = (a) => {
    for (let i = 0; i < screen.textContent.length; ++i) {
        if (screen.textContent[i] === '.') return;
    }
    if (curOp && shouldResetScr) screen.textContent = '';
    screen.textContent += a;
    shouldResetScr = false;
}

const updateOp = (a) => {
    if (screen.textContent.length === 0) return;
    if (curOp && enteredNum) lesGo();
    curOp = a;
    firstOp = screen.textContent;
    shouldResetScr = true;
    enteredNum = false;
}

const lesGo = () => {
    if (!curOp) return;
    secondOp = screen.textContent;
    screen.textContent = operate(firstOp, secondOp, curOp);
    firstOp = screen.textContent;
    curOp = null;
}

const del = () => {
    if (screen.textContent.length > 0) {
        screen.textContent = screen.textContent.slice(
            0,
            screen.textContent.length - 1,
        );
    }
}

calcNumbers.forEach((a) => {
    a.addEventListener('click', (e) => {
        pushNumber(a.textContent);
    });
});

calcOps.forEach((a) => {
    a.addEventListener('click', (e) => {
        updateOp(a.textContent);
    });
});

equals.addEventListener('click', (e) => {
    lesGo();
});

clear.addEventListener('click', (e) => {
    reset();
});

point.addEventListener('click', (e) => {
    pushPoint(point.textContent);
});

delBtn.addEventListener('click', (e) => {
    del();
});

document.addEventListener('keydown', (e) => {
    for (let i1 = 48, i2 = 96, j = 0; i1 < 58; ++i1, ++i2, ++j) {
        if (e.keyCode === i1) {
            pushNumber(String(j));
        } else if (e.keyCode === i2) {
            pushNumber(String(j));
        }
    }
    switch (e.keyCode) {
        case 8:
            del();
            break;
        case 13:
            lesGo();
            break;
        case 107:
            updateOp('+');
            break;
        case 109:
            updateOp('-');
            break;
        case 106:
            updateOp('*');
            break;
        case 111:
            updateOp('/');
            break;
        case 190:
            pushPoint('.');
            break;
    }
});
