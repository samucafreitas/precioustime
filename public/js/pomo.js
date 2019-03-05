// TODO: state functions
pomo = () => {
    var tomato = 25 * 60;
    var formatted_time;

    // That's why js sucks!
    setInterval(() => {
        formatted_time = `${('0' + Math.floor(tomato / 60)).slice(-2)}:${('0' + Math.floor(tomato % 60)).slice(-2)}`;
        document.getElementById('pomo').innerHTML = formatted_time;
        document.title = '(' + formatted_time + ')' + ' Precious Time';
        tomato--;}, 1000);
}