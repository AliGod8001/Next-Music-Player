const useNumber = (number: number) => {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const base = 1000;
    
    if (number === 0) return '0';
    
    number = Math.abs(number);
    
    const exponent = Math.min(Math.floor(Math.log(number) / Math.log(base)), suffixes.length - 1);
    const scaledNumber = number / Math.pow(base, exponent);
    const formattedNumber = scaledNumber.toFixed(2).replace(/\.?0+$/, '');

    return `${formattedNumber} ${suffixes[exponent]}`
}

export default useNumber;