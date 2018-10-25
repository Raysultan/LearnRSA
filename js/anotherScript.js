//--------------PRIME NUMBER CHECKER---------------------------
const bigNum = 5000;

const randomInt = (min, max) => {
    let n = bigInt.randBetween(min, max);
    if(n % 2 == 0) return (parseInt(n)+1);
    else return parseInt(n);
}
  
const atkin = (x) => {
    let limit = parseFloat(x);
    let sqr_lim, is_prime = [], x2, y2, i, j, n;
    // Инициализация решета
    sqr_lim = parseInt(Math.sqrt(limit));
    for (i = 0; i <= limit; i++) is_prime[i] = false;
    is_prime[2] = true;
    is_prime[3] = true;
    // Предположительно простые — это целые с нечётным числом
    // представлений в данных квадратных формах.
    // x2 и y2 — это квадраты i и j (оптимизация).
    x2 = 0;
    for (i = 1; i <= sqr_lim; i++) {
        x2 += 2 * i - 1;
        y2 = 0;
        for (j = 1; j <= sqr_lim; j++) {
            y2 += 2 * j - 1;
            n = 4 * x2 + y2;
            if ((n <= limit) && (n % 12 == 1 || n % 12 == 5))
                is_prime[n] = !is_prime[n];
            // n = 3 * x2 + y2; 
            n -= x2; // Оптимизация
            if ((n <= limit) && (n % 12 == 7))
                is_prime[n] = !is_prime[n];
            // n = 3 * x2 - y2;
            n -= 2 * y2; // Оптимизация
            if ((i > j) && (n <= limit) && (n % 12 == 11))
                is_prime[n] = !is_prime[n];
        }
    }
    // Отсеиваем кратные квадратам простых чисел в интервале [5, sqrt(limit)].
    // (основной этап не может их отсеять)
    for (i = 5; i <= sqr_lim; i++) {
        if (is_prime[i]) {
            n = i * i;
            for (j = n; j <= limit; j += n) {
                is_prime[j] = false;
            }
        }
    }
    // Вывод списка простых чисел в консоль.
    let primes = [2, 3, 5];
    for (i = 6; i <= limit; i++) {  // добавлена проверка делимости на 3 и 5. В оригинальной версии алгоритма потребности в ней нет.
        if (is_prime[i]){
            primes.push(i);
        }
    }
    return primes;
};
//primality test
const isPrime = (x) => {
    let primes = atkin(bigNum);
    for(let i = 0; i < primes.length; i++)
        if(x % primes[i] === 0) return false;
    return ferma(x);
};
//great common divisor
const GCD = (a, b) => {
    if(b===0)
        return a;
    return GCD(b, a % b);
};
//ferma primality test
const ferma = (x) => {
    function mul(a, b, m){
        if(b===1)
            return a;
        if(b%2===0){
            let t = mul(a, b/2, m);
            return (2 * t) % m;
        }
        return (mul(a, b-1, m) + a) % m;
    }
    function pows(a, b, m){
        if(b===0)
            return 1;
        if(b % 2 === 0){
            let t = pows(a, b/2, m);
            return mul(t, t, m) % m;
        }
        return (mul(pows(a, b-1, m), a, m)) % m;
    }
    if(x === 2)
        return true;
    for(let i = 0; i < 100; i++){
        let a = Math.floor(randomInt(0, x-2)+2);
        if(GCD(a, x) != 1)
            return false;
        if(pows(a, x-1, x) != 1)
            return false;
    }
    return true;
};
//prime generator-----------------------------------------------------------------------------
const randomPrime = (max = 255) => {
    let num=randomInt(3, max);
    return isPrime(num) ? num : randomPrime(max);
};

const sizedPrime = () => {
    let len = 39;
    let a = randomPrime();
    let b = randomPrime();
    let p = a * b;
    do{
        a = randomPrime();
        b = randomPrime();
        p = a * b;
        console.log(p);
    }while(p.toString().length != len)
    console.log(p);
};

const generateLargePrime = (k) => {
    let r = 100*(Math.log(k,2)+1);
    while(r>0){
        let n = randomInt(Math.pow(2, k-1), Math.pow(2, k));
        r -= 1;
        if(isPrime(n)) return n;
        else return false;
    }
};