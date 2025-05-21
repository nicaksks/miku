import MikuError from './MikuError';

export default class MikuBeam extends MikuError {
    public constructor(private data: any) {
        super({
            code: data?.code ?? 500,
            type: data?.type ?? 'Discord',
            message: data?.message ?? 'unknown',
            errors: data?.errors ?? null
        })
        delete this.data
    }
}
