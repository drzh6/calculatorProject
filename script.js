'use strict';

let display = document.getElementById('display');
let buttonsContainer = document.querySelector('.buttons');

let lastCharIsOperator = false; // Переменная для отслеживания последнего введенного оператора

display.addEventListener('input', function (event) {
  // Получаем текущее значение в поле ввода
  let inputValue = event.target.value;

  // Очищаем значение от всех символов, кроме цифр и допустимых операторов
  let cleanedValue = inputValue.replace(/[^0-9+\-*./]/g, '');

  // Устанавливаем очищенное значение обратно в поле ввода
  event.target.value = cleanedValue;

  // Обновляем переменную, отслеживающую последний введенный оператор
  lastCharIsOperator = isOperator(cleanedValue.charAt(cleanedValue.length - 1));
});

function appendToDisplay(value) {
  if (display && display.value !== undefined) {
    if (value === '.') {
      // Проверка на ввод '.' в пустое поле
      if (display.value === '') {
        display.value = '0' + value;
      } else {
        // Проверка, что в поле еще нет точки
        if (!display.value.includes('.')) {
          display.value += value;
        }
      }
    } else if (value === '0') {
      // Проверка на ввод нуля после первого нуля
      if (display.value !== '' && display.value !== '0') {
        display.value += value;
      }
    } else {
      if (lastCharIsOperator && isOperator(value)) {
        // Если последний символ - оператор и новый символ - оператор, заменяем его
        display.value = display.value.slice(0, -1) + value;
      } else {
        // В противном случае, добавляем символ как обычно
        display.value += value;
      }
    }
  }

  // Обновляем переменную, отслеживающую последний введенный оператор
  lastCharIsOperator = isOperator(value);
}

function isOperator(char) {
    // Проверка, является ли символ оператором
    return ['+', '-', '*', '/'].includes(char);
}

function reset() {
  display.value = '';
}

function square() {
  if (display.value !== '') {
    display.value = Math.pow(parseFloat(display.value), 2);
  } else {
    display.value = '';
  }
}

function divide() {
  appendToDisplay('/');
}

function multiply() {
  appendToDisplay('*');
}

function subtract() {
  appendToDisplay('-');
}

function add() {
  appendToDisplay('+');
}

function calculate() {
  let expression = display.value;
  try {
    if (expression.startsWith('*') || expression.startsWith('/')) {
      display.value = 'Error';
    } else {
      display.value = eval(expression);
    }
  } catch (error) {
    display.value = 'Error';
  }
}

