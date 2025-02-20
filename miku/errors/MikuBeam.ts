import MikuError from './MikuError';

export default class MikuBeam {

    public constructor(private readonly data: any) {
        
        if ('code' in this.data) {
            const { code, message } = this.data;
            throw new MikuError({ code, type: 'Discord', message, error_details: data?.errors })
        }

        throw new MikuError({ code: 500, type: 'Miku', message: 'unknown', error_details: JSON.stringify(data) })
    }
}