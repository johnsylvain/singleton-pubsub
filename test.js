import SingletonPubsub from './index';

describe('SingletonPubsub', function() {

    beforeEach(() => {
        this.pubsub = new SingletonPubsub();
    });

    describe('Instance', () => {
        it('should create a new instance', () => {
            expect(this.pubsub).toBeInstanceOf(SingletonPubsub);
        });
    
        it('should always return the same instance', () => {
            const newInstance = new SingletonPubsub();
    
            expect(this.pubsub).toBe(newInstance);
        })
    });

    describe('Pubsub', () => {
        it('should add events', () => {
            this.pubsub.on('event', () => {});

            const length = Object.keys(this.pubsub.events).length;

            expect(length).toBe(1);
        })
    })

})