//variant 12
const Nsize = 39;
const sLim = {b: "1e8", e: "1e10"};
const generateLargePrime = () => {
    let x = bigInt.randBetween("0", "1e20");
    while(!x.isPrime()){
        x = bigInt.randBetween("0", "1e20");
    }
    return x;
};

const generateNd = () => {
    let N, P, Q;
    N = P = Q = bigInt();
    do{
        P = generateLargePrime();
        Q = generateLargePrime();
        N = P.multiply(Q);
    }while(N.toString().length !== Nsize)
    const euler = () => {
        return (P.subtract("1")).multiply(Q.subtract("1"));
    };
    return {N: N, d: euler()};
};

const generateS = (d) => {
    let s = bigInt();
    do{
        s = bigInt.randBetween(sLim.b, sLim.e);
    }while(bigInt.gcd(s, d)!=1)
    return s;
};

const findE = (s, d) => {
    let m0 = d, y = bigInt("0"), x = bigInt("1");
    while(s.greater(1)){
        let q = s.divide(d);
        let temp = d;
        d = s.mod(d);
        s = temp;
        temp = y;
        y = x.subtract(q.multiply(y));
        x = temp;
    }
    if(x.lesser(0)) x = x.add(m0);
    return x;
};

const keyGen = () => {
    let {N, d} = generateNd();
    let s = generateS(d);
    let e = findE(s, d);
    return {N: N, s: s, e: e};
};

// const a = performance.now();
// let {N, s, e} = keyGen();
// const b = performance.now();
// console.log(`N: ${N}\ns: ${s}\ne: ${e}\nTime taken: ${b-a}`);

const bsize = 39;
const encrypt = (msg, s, N) => {
    const makeEncryptBlocks = (msg, Nsize) => {
        let blocks = [];
        while(msg.length>=Nsize){
            let temp = "";
            for(let i = 0; i < Nsize; i++){
                temp += msg[i];
            }
            msg = msg.substr(temp.length, msg.length-1);
            blocks.push(temp);
        }
        blocks.push(msg);
        return blocks;
    };

    const makeASCII = (blocks) => {
        let m = [];
        blocks.forEach(e => {
            let temp = [];
            for(let i = 0; i < e.length; i++)
                temp[i] = bigInt(e.charCodeAt(i));
            m.push(temp);
        });
        return m;
    };

    const makeStr = (blocks) => {
        let str = "";
        blocks.forEach(element => {
            element.forEach( o => {
                str+=o.toString();
                str += ' ';
            });
        });
        return str.substr(0, str.length-1);
    };
    let m = makeASCII(makeEncryptBlocks(msg, bsize));
    let x = [];
    m.forEach(element => {
        let temp = [];
        for(let i = 0; i < element.length; i++)
            temp[i] = element[i].modPow(s, N);
        x.push(temp);
    });
    let encrypted = makeStr(x);
    return encrypted;
};

const decrypt = (str, e, N) => {
    const makeDecryptBlocks = (msg, Nsize) => {
        let blocks = [];
        let strArray = msg.split(' ');
        while(strArray.length>=Nsize){
            let temp = [];
            for(let i = 0; i < Nsize; i++){
                temp.push(bigInt(strArray[i]));
            }
            strArray.splice(0, temp.length);
            blocks.push(temp);
        }
        let temp = [];
        for(let i = 0; i < strArray.length; i++)
            temp.push(bigInt(strArray[i]));
        blocks.push(temp);
        return blocks;
    };

    const makeUTF = (blocks) => {
        let str = "";
        blocks.forEach(element => {
            for(let i = 0; i < element.length; i++)
                str += String.fromCharCode(element[i]);
        });    
        return str;
    };

    const blocks = makeDecryptBlocks(str, bsize);
    let asciiblocks = [];
    blocks.forEach(element => {
        let temp = [];
        for(let i = 0; i < element.length; i++)
            temp[i] = element[i].modPow(e, N);
            asciiblocks.push(temp);
    });
    return makeUTF(asciiblocks);
};