const display = document.getElementById(`display`);

function displayValue(value){
    const lastChar = display.value.slice(-1);
    const errorValue = [`Error`,`null`,`NaN`,`Infinity`];
    if(
    ([`+`,`-`,`×`,`÷`].includes(lastChar) && [`+`,`-`,`×`,`÷`].includes(value)) ||
    (lastChar === `%` && value === `%`) ||
    (display.value === `` && [`+`,`-`,`×`,`÷`,`%`].includes(value)) ||
    (display.value.includes(`.`) && value === `.`) ||
    (errorValue.includes(display.value))
    ){
        return;
    }
    display.value += value;
};

function clearEmpty(){
    display.value = ``;
};

function clearBackspace(){
    const currentValue = display.value;
    if(currentValue.length > 0){
        display.value = currentValue.slice(0, -1);
    };
};

function operate(){
    function calculation(calculate){
        try{
            calculate = calculate
                .replace(/(\d+)%([\+\-\×\÷])?(\d+)/g, function(rearrange, p1, p2, p3){
                    if(p2 && [`+`,`-`,`×`,`÷`].includes(p2)){
                        rearrange = `${p1}/100${p2}${p3}`;
                        return rearrange;
                    } else{
                        rearrange = `${p1}/100*${p3}`;
                        return rearrange;
                    }
                })
                .replace(/%/g, `/100`);
            calculate = calculate.replace(/×/g, `*`).replace(/÷/g, `/`);
            return Function(`return ${calculate}`)();
        } catch(error){
            return `Error`;
        };
    };
    const result = calculation(display.value);
    display.value = result;
};