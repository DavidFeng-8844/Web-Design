const random_Code =() => {
    let len = 8;
    Calpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    Laplha = "abcdefghijklmnopqrstuvwxyz";
    num = "0123456789";
    code = "!@#$%^&*()_+";
    var random = "";
    for (let i = 0; i < len / 4; i++) {
        random += Calpha[Math.floor(Math.random() * Calpha.length)];
        random += num[Math.floor(Math.random() * num.length)];
        random += code[Math.floor(Math.random() * code.length)];
        random += Laplha[Math.floor(Math.random() * Laplha.length)];
    }
    console.log(random);
}
random_Code();