const display = document.querySelector('.input');
const buttons = document.querySelectorAll('button');

let expression = '';
buttons.forEach(button =>{
    button.addEventListener('click' ,()=>{
        const value = button.textContent.trim();
        switch(true){
            case button.classList.contains('numbers'):
            case button.classList.contains('decimal'):
            case button.classList.contains('operation'):
            if(value==='( )'){
                handleBrackets();
            }     
            else{
                addToExpression(value);
            } 
            break;

            case button.classList.contains('clear'):
                clearDisplay();
            break;
            case button.classList.contains('back-space'):
                removeLastCharacter();
            break;

            case button.classList.contains('equal'):
                calculateResult();
            break;
        }
    });
});

function addToExpression(value){

    const ops ={
        '+': '+',
        '−': '-',
        '-': '-',
        '×': '*',
        '*': '*',
        '÷': '/',
        '/': '/',
        '%': '/100',
        '(': '(',
        ')': ')'

    };
    expression+= ops[value] || value; 
    updateDisplay();
}

function clearDisplay(){
    expression = '';
    updateDisplay();
}

function removeLastCharacter(){
    expression =expression.slice(0,-1);
    updateDisplay();
}

function calculateResult(){
    try{
        let result = eval(expression);
        if(result % 1 !==0){
            result=Number(result.toFixed(6));
        }
        expression = result.toString();
        updateDisplay();

    } catch(error){
        expression = 'Error';
        updateDisplay();
        setTimeout(() => clearDisplay(), 2000);
    }
}

function handleBrackets(){
    const openBrackets = (expression.match(/\(/g) || []).length;
    const closeBrackets = (expression.match(/\)/g) || []).length;
    if(openBrackets === closeBrackets || expression.endsWith('(')){
        expression +='(';
    }else {
        expression +=')';
    }
    updateDisplay();
}
function updateDisplay(){
    display.textContent = expression || '0';
}