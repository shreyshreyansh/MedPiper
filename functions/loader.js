const P = ["\\", "|", "/", "-"];
let x = 0;
module.exports = {
  loader1: (dialog, timer) => {
    load1 = setInterval(() => {
      process.stdout.write(`\r${P[x++]}`);
      x %= P.length;
    }, 250);
    setTimeout(() => {
      clearInterval(load1);
      console.log(dialog);
    }, timer);
  },
  loader2: (dialog, timer) => {
    load2 = setInterval(() => {
      process.stdout.write(`\r${P[x++]}`);
      x %= P.length;
    }, 250);
    setTimeout(() => {
      clearInterval(load2);
      console.log(dialog);
      console.log("Now you can proceed...");
    }, timer);
  },
};
