"use strict";

/*
Даны несколько обьектов клиентов банка со следующими данными
fullName - ФИО клента
clientLevel - уровень договора с банком от которого зависят тарифы на определенные услуги
*/

const client1 = {
  fullName: "Ivan Ivanovich Ivano",
  clientLevel: "basic",
  money: 10000,
};

const client2 = {
  fullName: "Vasiliy Vasil'evich Vaso",
  clientLevel: "pro",
  money: 15000,
};

const client3 = {
  fullName: "Ivan Ivanovich Ivanov",
  clientLevel: "platinum",
  money: 20000,
};

/*
Также есть обьект банка содержащий следующие данные:
bankName - название банка
clientLevels - обьекты со свойствами, являющимися уровнями договора с банком (например basic, pro, platinum, ...). 
Каждый уровень договора содержит внутри себя свойство discount которое хранит размер скидки в процентах
*/

const bank = {
  bankName: "Big bank",
  clientLevels: {
    basic: { discount: 5 },
    pro: { discount: 10 },
    platinum: { discount: 20 },
  },
};

/*
clientLevel должен быть связан с обьектом уровня договора через Map
*/

const clientLevel = new Map([
  [client1, bank.clientLevels],
  [client2, bank.clientLevels],
  [client3, bank.clientLevels],
]);

// Реализовать функцию расчета стоимости покупки пользователем торвара, которая принимает пользователя и цену товара и возвращает стоимость товара с учетом скидки. Скидку доставать из хранящихся в мапе данных.
// В случае если в мапе с уровнем клиента нет своязанного уровня в банке (например там решили убрать этот уровень договора) то можно считать что скидки нет.

function customerPurchase(client, price) {
  let clientDiscount = 0; // задаём скидку клиента
  let goodsPrice = 0; // задаём цену товара со скидкой
  //  поиск клиента в map
  for (const [key, value] of clientLevel) {
    // находим клиента
    if (client === key) {
      // находим скидки банке
      for (const [key, discountValues] of Object.entries(value)) {
        // находим уровень клиента
        if (client.clientLevel === key) {
          // получем скидку клиента
          for (const [, value] of Object.entries(discountValues)) {
            clientDiscount += value;
          }
        }
      }
    }
  }

  /*
  Bonus tasks:
  У обьектов клиентов должно быть свойство, показывающее деньги на их счету
  При покупке количество денег на счету должно уменьшится на сумму покупки со скидкой.
  При попытке купить товар, на который у пользователя не хватит денег ему должно выкидывать ошибку, в которой указано сколько ему не хватает денег до покупки
*/

  goodsPrice += price * (1 - clientDiscount / 100); //стоимость покупки
  console.log(`Цена со скидкой ${goodsPrice}`); // выводим цену со скидкой
  // const buy = confirm("Хотите купить?");
  // if (buy === true) {
  // если да, то совершаем покупку
  if (client.money < goodsPrice) {
    // проверяем достаточно ли денег на счету клиента
    throw new Error(
      `Не хватет средств на счету в размере ${goodsPrice - client.money} единиц`
    ); //если не достаточно, то выводим ошибку
  }
  console.log(`Остаток на счете - ${(client.money -= goodsPrice)}`); // если достаточно выводим остаток клиента и меняем баланс
  // }
  return "Спасибочки за покупку";
}

console.log(customerPurchase(client1, 10000));
console.log(customerPurchase(client2, 10000));
console.log(customerPurchase(client3, 25000));
