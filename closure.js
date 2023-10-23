// Note: Param truyen vao la khong the thay doi
// Closures 'remember' the environment in which they were created.
// Nếu là số thì khi truyền vào param sẽ tạo ra bản sao khác chứ k như object
/*
* Hãy tìm hiểu sâu hơn về lý do tại sao các bao đóng vẫn có quyền truy cập vào các biến được xác định bên ngoài phạm vi của chúng, ngay cả khi hàm bên ngoài không còn tồn tại – ví dụ: borderRadius?

Câu trả lời rất đơn giản: bao đóng không lưu trữ giá trị tĩnh. Thay vào đó, chúng lưu trữ các tham chiếu đến các biến có trong chuỗi phạm vi. Theo cách này, ngay cả khi chức năng bên ngoài chết, chức năng bên trong, đó là một bao đóng, vẫn có quyền truy cập vào các biến cha của nó.*/
// https://viblo.asia/p/scope-trong-javascript-RQqKLnW6l7z đọc phần comment để hiểu scopr chain và lexical
// scope chain là 1 biến k có thì sẽ tìm vào scope cha của nó. lexical 1 functionc ĐƯỢC TẠO trong 1 fuction thì truy cap
// vào được vào các giá trị con của nó. Ví dụ k có tính lexical trong 1 fuction nhỏ
/*
* var text;
function b() {
  console.log(text);
}

function a() {
  var text = "in a";
  b();
}

a();
text = "in gloal";
* function b() không có text nên mò vào scope chain của nó là global scope để tìm text, tại sao k phải mò vào a
* vì b() k dc tạo trong a() mà trong global scope, nên  nó lấy giá trị text trong global
* ==. cách thực thi. đàu tiên executel global context đc tạo ra rồi,quét rồi cấp giá trị rồi thực thi,
*  chạy đến b() thì tạo ra 1 stack mới rồi quét rồi cấp giá trị, vì giá trị text k có nên quét lên scope cha để tìm(" chứ k phải tạo stack cha")
* rồi thực thi
* */

/*
Một function mới = một scope mới, đó là quy tắc--
* SCOPE CHAIN thiết lập cho mỗi scope một function nhất định. Mỗi function lại định nghĩa nested scope riêng như ta đã biết,
*  và mỗi function được định nghĩa trong một function khác đều là local scope được liên kết với function
*  bên ngoài - sự kết nối ấy được gọi là chain.

LEXICAL SCOPE Khi bạn nhìn thấy một function bên trong một function khác,
function bên trong có thể truy cập đến scope của function bên ngoài, đó gọi là Lexical Scope

scope chain : các scope lồng nhau */


var someone = {name: 'Dan'};
function sayHi(person) {
    let time = 0;
    // let someone={name:"k"}
    setTimeout(() => {
        console.log(person===someone) // Sau khi đi qua webApi đẩy lại vào callstack-> truy cập lại vào các biến local sayHi() chưa setTimeout() lúc đó, so sánh xem person có bằng someOne nữa k , nếu k bằng thì thay địa chỉ clone 1 giá trị cho person, còn nếu bằng thì vẫn tham chiếu tói someOne
        console.log('Hello, sayHi' + person.name);
        person.name = "last";

         console.log(time)
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
// scope chain: khi 1 biên được khai báo trong excecution context này mà ctr không thấy giá trị thì nó sẽ mò lên scope tạo ra function đó tìm xem biến đó có được khai báo trên này không