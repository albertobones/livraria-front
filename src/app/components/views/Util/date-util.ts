export class DateUtil{

    public static parseDate(dateStr: string): Date | null {
        if(new RegExp(/\d{4}-\d{2}-\d{2}/i).test(dateStr)){
          let split = dateStr.split('-');
          return new Date(parseInt(split[0]), parseInt(split[1])-1, parseInt(split[2]));
        }else{
          console.log('Implementar parse para o padrao de data', dateStr);
        }
        return null;
    }
    
    public static adicionaZero(numero: number){
        if (numero <= 9)
            return "0" + numero;
        else
            return numero;
    }

    public static formatDateBR(date: Date): string {
        let dataAtualFormatada = (this.adicionaZero(date.getDate()) + "/" + (this.adicionaZero(date.getMonth()+1).toString()) + "/" + date.getFullYear());
        return dataAtualFormatada;
      }
    public static formatarDataAAAAMMDD(data: string) {
        if(data && data != null) {
          return data.substring(6,8) + "/" + data.substring(4,6) + "/" + data.substring(0,4)
        }
      }
    
      public static formatarDataDDMMAAAA(data: string) {
        if(data && data != null) {
          return data.substring(0,2) + "/" + data.substring(2,4) + "/" + data.substring(4,8)
        }
      }
    
}