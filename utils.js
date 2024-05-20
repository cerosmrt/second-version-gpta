export function formatString(str) {
    return str.replace(/[.,]/g, '<br>')
        .split('<br>')
        .map(line => {
            line = line.trim();
            if (line.length > 0) {
                line = line[0].toLowerCase() + line.slice(1);
                while (line.length > 0 && (line[line.length - 1] === ';' || line[line.length - 1] === ' ')) {
                    line = line.slice(0, -1);
                }
            }
            return line;
        }).filter(line => line.length > 0)
        .join('<br>');
}