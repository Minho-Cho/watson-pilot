module.exports = (function() {

    function Cron(date, time, func) {
        var now = new Date();
        var date = date.replace(/[^(0-9)]*/gi, '').substr(0, 4) + '-' + date.replace(/[^(0-9)]*/gi, '').substr(4, 2) + '-' + date.replace(/[^(0-9)]*/gi, '').substr(6, 2);
        var time = time.replace(/[^(0-9)]*/gi, '').substr(0, 2) + ':' + time.replace(/[^(0-9)]*/gi, '').substr(2, 2) + ':00';

        if (!validate(date, time)) {
            console.log('input not valid');
            return false;
        }

        var targetDate = new Date(date + ' ' + time);
        var interval = targetDate.getTime() - now.getTime();

        try {
            if (interval < 0) {
                func();
            } else {
                var sto = setTimeout(func, interval);
                return sto;
            }
        } catch (e) {
            console.log('cron Error : ', e);
            return false;
        }
    }

    function validate(date, time) {
        if (date.match(/[0-9]{4}-(0[1-9]{1}|1[0-2]{1})-(0[1-9]{1}|1[0-9]{1}|2[0-9]{1}|3[0-1]{1})/) && time.match(/((0|1)[0-9]{1}|2[0-3]{1}):(00|30):00/)) {
            return true;
        } else {
            return false;
        }
    }

    return Cron;
}());
