import {fakeAsync, tick} from '@angular/core/testing'
import {interval} from 'rxjs'
import {marbles} from 'rxjs-marbles'
import {take} from 'rxjs/operators'
import {bufferDelayFunc} from './buffer-delay-func.operator'
import createSpy = jasmine.createSpy

fdescribe('testing existing operators', () => {
    fit('should work with fakeAsync', fakeAsync(() => {
        const source$ = interval(1500).pipe(take(3))
        const result = source$.pipe(bufferDelayFunc(1000))
        const spy = createSpy()
        result.subscribe(spy)
        tick(1500)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(0)
        tick(1500)
        expect(spy).toHaveBeenCalledTimes(2)
        expect(spy).toHaveBeenCalledWith(1)
        tick(1500)
    }))
    it('should work with fakeAsync', fakeAsync(() => {
        const source$ = interval(1000).pipe(take(3))
        const result = source$.pipe(bufferDelayFunc(2000))
        const spy = createSpy()
        result.subscribe(spy)
        tick(1000)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(0)
        tick(500)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(0)
        tick(500)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(0)
        tick(1000)
        expect(spy).toHaveBeenCalledTimes(2)
        expect(spy).toHaveBeenCalledWith(1)
        tick(100000)
    }))
    it('should work with fakeAsync', fakeAsync(() => {
        const source$ = interval(1000).pipe(take(3))
        const result = source$.pipe(bufferDelayFunc(2000))
        const spy = createSpy()
        result.subscribe(spy)
        tick(1000)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(0)
        tick(500)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(0)
        tick(500)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(0)
        tick(1000)
        expect(spy).toHaveBeenCalledTimes(2)
        expect(spy).toHaveBeenCalledWith(1)
        tick(1000)
        expect(spy).toHaveBeenCalledTimes(2)
        expect(spy).toHaveBeenCalledWith(1)
        tick(1000)
        expect(spy).toHaveBeenCalledTimes(3)
        expect(spy).toHaveBeenCalledWith(2)
        tick(100000)
    }))
    it('should work with marbles', marbles((m) => {
        const s = '--1--2--3|'
        const e = '--1----2----(3|)'

        const source$ = m.cold(s)
        const expected = m.cold(e)
        const results$ = source$.pipe(bufferDelayFunc(1000))
        m.expect(results$).toBeObservable(expected)

    }))
})
