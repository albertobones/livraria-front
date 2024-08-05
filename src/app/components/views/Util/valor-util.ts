export class ValorUtil{
    public static convertToNumber(value: string | null): number | undefined {
        if (value === null || value.trim() === '') {
            return undefined; // Retorna null se o valor for nulo ou uma string vazia
        }
    
        const num = Number(value);
    
        // Verifica se o resultado é NaN (não é um número)
        if (isNaN(num)) {
            return undefined;
        }
    
        return num;
    }
}