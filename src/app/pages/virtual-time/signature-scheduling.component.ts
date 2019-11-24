import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {asyncScheduler, Observable, SchedulerLike, Subscription, timer, VirtualTimeScheduler} from 'rxjs';
import {take, tap} from 'rxjs/operators';

interface CanvasPoint {
  x: number;
  y: number;
  time: number;
  color: string;
}

type CanvasPath = CanvasPoint[];

type Signature = CanvasPath[];

@Component({
  selector: 'app-signature-scheduling',
  templateUrl: './signature-scheduling.component.html',
  styles: [`
    signature-pad {
      border: 2px dashed #eee;
    }

    app-signature-pad-card-group {
      width: 500px;
      display: block;
    }

    .row {
      display: flex;
      flex-wrap: wrap;
      height: 600px;
      width: 100%;
    }

    .row .col {
      width: 50%;
    }

    .animation-progress {
      float: left;
    }
  `]

})
export class SignatureSchedulingComponent {

  virtualTimeScheduler: VirtualTimeScheduler = new VirtualTimeScheduler();
  drawingProcessSub = new Subscription();

  form: FormGroup;
  recordConfig = {
    name: 'signature',
    msg: {initial: 'Record Signature'}
  };
  animateConfig = {
    name: 'signature-player',
    msg: {initial: 'Signature is rendered here'}
  };

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      signature: [],
      'signature-player': []
    });
  }

  drawSignature(showImmediately?: boolean) {
    // get scheduler
    const scheduler = !showImmediately ? asyncScheduler : this.virtualTimeScheduler;
    // get values for animation
    const signature = this.getSignatureToAnimate();
    const startMs = new Date(signature[0][0].time).getTime();

    // reset
    this.resetAnimatedSignature();

    // loop over the 2d array of the signature
    signature.forEach((segment, segmentIndex) => {
      segment.forEach((point) => {
        const delay = this.getDelayForPoint(point, startMs);
        const initialState = {segmentIndex, point};
        const work = (state: {segmentIndex: number, point: CanvasPoint}) => {
          console.log('initialState:', state);
          const actualSignature = this.getCurrentAnimatedSignature();
          const updatedSignature = this.getUpdateSignature(actualSignature, state.segmentIndex, state.point);
          this.updateAnimatedSignature(updatedSignature);
        };

      });
    });

    if (showImmediately) {
    }
  }

  // Helpers ===================================================

  smallDemo() {
    function getEverySecond$(prefix: string, scheduler?: SchedulerLike): Observable<number> {
      return timer(0, 1000, scheduler ? scheduler : null)
        .pipe(
          tap(tickNr => console.log(prefix, ':', tickNr)),
          take(20)
        );
    }

    const vTS = new VirtualTimeScheduler();

    const everySecond$ = getEverySecond$('default');
    const everySecond2$ = getEverySecond$('virtualTime', vTS);

    setTimeout(() => console.log('1 sec past'), 1000);
    everySecond$.subscribe();
    everySecond2$.subscribe();
    vTS.flush();

  }

  private getDelayForPoint(point, startMs: number) {
    return point.time - startMs;
  }

  private getSignatureToAnimate(): Signature {
    return this.form.get('signature').value || this.getDummySignature();
  }

  private getCurrentAnimatedSignature(): any[] {
    return this.form.get('signature-player').value;
  }

  private resetAnimatedSignature() {
    this.updateAnimatedSignature([]);
  }

  private updateAnimatedSignature(signatureData) {
    this.form.get('signature-player')
      .patchValue(signatureData);
  }

  private getUpdateSignature(signature, segmentIndex, point) {
    const updatedSignature = [...signature] || [];
    if (updatedSignature[segmentIndex] === undefined) {
      updatedSignature[segmentIndex] = [point];
    } else {
      updatedSignature[segmentIndex].push(point);
    }
    return updatedSignature;
  }

  private getDummySignature(): Signature {
    return [
      [
        {
          x: 69.015625,
          y: 79,
          time: 1524434483629,
          color: 'red'
        },
        {
          x: 86.015625,
          y: 64,
          time: 1524434483690,
          color: 'red'
        },
        {
          x: 97.015625,
          y: 57,
          time: 1524434483706,
          color: 'red'
        },
        {
          x: 106.015625,
          y: 53,
          time: 1524434483722,
          color: 'red'
        },
        {
          x: 115.015625,
          y: 51,
          time: 1524434483739,
          color: 'red'
        },
        {
          x: 97.015625,
          y: 57,
          time: 1524434483706,
          color: 'red'
        }
      ],
      [
        {
          x: 74.671875,
          y: 12,
          time: 1524434484279,
          color: 'red'
        },
        {
          x: 87.671875,
          y: 21,
          time: 1524434484374,
          color: 'red'
        },
        {
          x: 95.671875,
          y: 22,
          time: 1524434484390,
          color: 'red'
        },
        {
          x: 103.671875,
          y: 21,
          time: 1524434484427,
          color: 'red'
        },
        {
          x: 87.671875,
          y: 21,
          time: 1524434484374,
          color: 'red'
        },
        {
          x: 105.671875,
          y: 20,
          time: 1524434484446,
          color: 'red'
        }
      ],
      [
        {
          x: 153.671875,
          y: 43,
          time: 1524434484612,
          color: 'red'
        },
        {
          x: 168.671875,
          y: 40,
          time: 1524434484656,
          color: 'red'
        },
        {
          x: 179.671875,
          y: 35,
          time: 1524434484676,
          color: 'red'
        },
        {
          x: 153.671875,
          y: 43,
          time: 1524434484612,
          color: 'red'
        },
        {
          x: 185.671875,
          y: 32,
          time: 1524434484696,
          color: 'red'
        }
      ],
      [
        {
          x: 108.671875,
          y: 95,
          time: 1524434485409,
          color: 'red'
        },
        {
          x: 122.671875,
          y: 104,
          time: 1524434485522,
          color: 'red'
        },
        {
          x: 127.671875,
          y: 105,
          time: 1524434485540,
          color: 'red'
        },
        {
          x: 140.671875,
          y: 102,
          time: 1524434485573,
          color: 'red'
        },
        {
          x: 152.671875,
          y: 97,
          time: 1524434485590,
          color: 'red'
        },
        {
          x: 157.671875,
          y: 94,
          time: 1524434485606,
          color: 'red'
        },
        {
          x: 172.671875,
          y: 86,
          time: 1524434485623,
          color: 'red'
        },
        {
          x: 177.671875,
          y: 81,
          time: 1524434485641,
          color: 'red'
        },
        {
          x: 157.671875,
          y: 94,
          time: 1524434485606,
          color: 'red'
        }
      ]
    ];

  }

}
