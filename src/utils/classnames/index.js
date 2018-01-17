function classnames(...args) {
    return args
        .reduce((rets, arg) => {
            if (!arg) {
                arg = [];
            } else if (typeof arg === 'string') {
                arg = arg.split(/\s+/g);
            } else {
                arg = Object.keys(arg).filter(name => !!arg[name]);
            }

            return rets.concat(arg);
        }, [])
        .join(' ');
}

export default classnames;

