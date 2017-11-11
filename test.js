import SingletonPubsub from './index';

describe('SingletonPubsub', function() {

    beforeEach(() => {
        this.pubsub = new SingletonPubsub({
            reinstantiate: true
        });
    });

    describe('Instance: Singleton tests', () => {
        it('should create a new instance', () => {
            expect(this.pubsub).toBeInstanceOf(SingletonPubsub);
        });
    
        it('should always return the same instance', () => {
            const newInstance = new SingletonPubsub();
    
            expect(this.pubsub).toBe(newInstance);
        });

        it ('should return the same instance with same events', () => {
            this.pubsub
                .on('event', () => {});

            const newInstance = new SingletonPubsub();

            expect(this.pubsub.events).toBe(newInstance.events);
        })
    });

    describe('Pubsub: event tests', () => {
        it('should add events', () => {
            this.pubsub
                .on('event', () => {});

            const length = Object.keys(this.pubsub.events).length;

            expect(length).toBe(1);
        });

        it('should emit events', () => {
            this.pubsub
                .on('event', ({ message }) =>{
                    expect(message).toBe('event fired!')
                })
                .emit('event', {
                    message: 'event fired!'
                });
        });

        it('should emit multiple events', () => {
            this.pubsub
                .on('event', ({ message }) => {
                    expect(message).toBe('an event fired');
                })
                .on('event', ({ alert }) => {
                    expect(alert).toBe('alert!');
                });

            this.pubsub
                .emit('event', {
                    message: 'an event fired',
                    alert: 'alert!'
                })
        });

        it('should remove event handelers', () => {
            const onFoo = (data) => {
                console.log(data)
            }

            this.pubsub
                .on('event', onFoo)
                .off('event', onFoo);
            
            const length = this.pubsub.events['event'].length;
            expect(length).toBe(0)
        });
    });

});