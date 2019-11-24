import {fakeAsync, tick} from '@angular/core/testing';
import {asyncScheduler, from, interval, onErrorResumeNext} from 'rxjs';
import {marbles} from 'rxjs-marbles/jasmine';
import {map, take} from 'rxjs/operators';
import createSpy = jasmine.createSpy;

fdescribe(`testing existing operators`, () => {
    describe(`maps values to power 2`, () => {
        it('should test with done callback', (done: DoneFn) => {
            const source$ = from([1, 2, 3, 4, 5], asyncScheduler);
            const result$ = source$.pipe(
                map(v => v ** 2),
            );

            const expectedValues = [1, 4, 9, 16, 25];

            const spy = createSpy('mapSpy');

            result$.subscribe({
                next: spy,
                complete: () => {
                    expect(spy).toHaveBeenCalledTimes(5);
                    expectedValues.forEach(v => {
                        expect(spy).toHaveBeenCalledWith(v);
                    });
                    done();
                },
                error: done.fail
            });

            done();
        });

        it('should work with fakeAsync', fakeAsync(() => {
            const source$ = interval(1000)
                .pipe(take(5));
            const result$ = source$.pipe(
                map(v => v ** 2),
            );
            const expectedValues = [0, 1, 4, 9, 16];
            const spy = createSpy('mapSpy');

            result$.subscribe(spy);

            expect(spy).not.toHaveBeenCalled();

            for (let i = 0; i < 5; i++) {
                tick(1000);
                expect(spy).toHaveBeenCalledWith(expectedValues[i]);
            }

        }));

        it('should work with marbles', marbles((m) => {
            const s = '-1--2--3--4--5|';
            const e = '-x--y--z--w--q|';

            const source$ = m.cold(s);
            const result$ = source$.pipe(map(x => x ** 2));
            const expected$ = m.cold(e, {
                x: 1,
                y: 4,
                z: 9,
                w: 16,
                q: 25,
            });

            m.expect(result$).toBeObservable(expected$);
        }));

        it('should work with marbles (swallow fail)', marbles((m) => {
            const s1 = '-1--2--#--4--5|';
            const s2 = '4--5|';
            const e = '-x--y--w--q|';

            const source1$ = m.cold<number>(s1);
            const source2$ = m.cold<number>(s2);
            const source$ = onErrorResumeNext<number, number, number>(source1$, source2$)
            const result$ = source$.pipe(map(x => x ** 2));
            const expected$ = m.cold(e, {
                x: 1,
                y: 4,
                z: 9,
                w: 16,
                q: 25,
            });

            m.expect(result$).toBeObservable(expected$);
        }));
    });
});
