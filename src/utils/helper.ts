export function uid() {
    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substr(2)
    );
}

export const StyleUnit = ['px', 'em', 'rem', '%'];

export function getCssValue(value: string): number {
    if (value) {
        const unit = StyleUnit.find(p => value.includes(p));
        let result = value.replace(unit || '', '');
        return parseInt(result);
    }
    return 0;
}
