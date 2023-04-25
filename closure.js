var someone = {name: 'Dan'};
function sayHi(person) {
    let time = new Date().getTime();
    console.log(time)
    // let someone={name:"k"}
    setTimeout(() => {
        console.log(person===someone)
        console.log('Hello, sayHi' + person.name);
        person.name = "last";

        // console.log(time)
    }, 100);
}

function sayHi1(person) {
    setTimeout(() => {
        console.log(person === someone);
        console.log('Hello, sayHi' + person.name);
        // person.name = "@";
    }, 200);
}


sayHi(someone);
/* Ở đây khi không có dòng someone = {name: 'Yuzhi'};
 thì tham số person vẫn tham chiếu tới someone, nên person thay đổi thì someOne thay đổi,
  nhưng khi chạy vào setTimeOut; các biến local nằm trong function chứa setTimeout vẫn có thể truy cập được trong setTimeOut
  - nhưng nó sẽ đánh giá, khi sayHi() chạy ra block nhưng chưa chạy setTimeout(), mà biến someOne ở đây đã bị sửa đổi, ngay lập tức javascript biến person không tham chiếu tới biến someOne đó nữa,
  biến person được gán 1 giá trị chính là giá trị lúc excecute context chạy đến dòng setTimeOut lúc đầu.

  -Trong closure sau khi debug thấy person là name:"Dan";
  Có vẻ như setTimeout cũng là 1 dạng closure , hàm trong hàm và chờ đến 1 lúc để gọi lại
* */
someone = {name: 'Yuzhi'};

// sayHi(someone);
// console.log(someone)
// setTimeout(() =>
//     console.log(someone), 1000)

//--------------------------
// var printsToBeExecuted = [];
// for (let i = 0; i < 3; i++) {
//     printsToBeExecuted.push(() => {
//         console.log(i) // vì biến let nên mỗi lần lặp block lại đóng, i lần lượt là 1 2 3 sau mỗi lần đóng  "trong TH này vì trong for dạng closure vì sinh ra 1 hàm nên các biến
//         trong stack vẫn còn truy cập được" , giá trị param lúc đó lần lợt là 1 2 3
//     });
// }
//
// printsToBeExecuted.forEach(f => f()); // sau khi thằng này chạy nó lại mò đến từng stack của từng function và in ra giá trị  1 2 3
// nếu là for(var i=0...) bới vì không tạo ra blockcode nên  i cuối là 3. Khi chạy printsToBeExecuted.forEach(f => f()) nó lại chạy đến dòng 45, vì không phải block scope, i =3 trong scope lớn global context nên in ra 3 3 lần
//


////--------------------------------
/* Đơn thuần không có setTimeOut
khi chạy vao hamCha() truyền ref someOne, do closure hamCon có thể truy cập được vào biến local của hamCha và sửa đổi
*
* */
/*var someOne = {name:"son"}
function hamCha (param) {
    var count;
    console.log(123)
     count  = new Date().getTime();
    console.log(count);
    param.name = new Date().getTime().toString();

    function hamCon() {
        count+=3;
        param.name = "hgello"
        console.log(param===someOne);
    }
   return  hamCon;
    // console.log(bienCon);
}
hamCha(someOne);
console.log(someOne);
someOne.name="1231"
hamCha(someOne)()
console.log(someOne)
hamCha(someOne)();*/
////----------------------------
/*var someOne = {name: "son"}

function hamCha(param) {
  //  param.name = new Date().getTime().toString();
console.log(param)
    setTimeout(() => {
        console.log(1)
        console.log(param)
    },100);
    // console.log(bienCon);
}

hamCha(someOne);
someOne.name="123"
 console.log(someOne);
// hamCha(someOne)()*/
/////-------------

//------------------
/* nếu ta gọi kiểu
hamCha(someOne);
hamCha(someOne)();
thì mỗi lần rõ ràng nó là khác nhau rồi nên biến cout lâần sau đc khai báo từ đầu;
khai báo var dât = hamCha() rồi
data();
data();
thì nó sẽ cộng dồn biến cha, bởi closure nên thằng con vẫn truy  cập được vào biến thằng cha
Note: tại sao function cha chạy xong khỏi callstack mà các biến còn giữ lại? Bởi javacript thấy closure nên không khởi tạo garbage dọn rác nên thằng con truy cập được
* */
/*var someOne = {name:"son"}
function hamCha (param) {
    var count;
    console.log(123)
     count  = new Date().getTime();
    console.log(count);
    param.name = new Date().getTime().toString();

    function hamCon() {
        count+=3;
        param.name = "hgello"
        console.log(param===someOne);
    }
   return  hamCon;
    // console.log(bienCon);
}
var data = hamCha(someOne);
console.log(someOne);
someOne.name="1231"
data();
console.log(someOne)
data();*/
//----------------------------------
