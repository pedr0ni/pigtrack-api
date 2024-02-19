import {Injectable} from '@nestjs/common';
import axios from 'axios';
import {TrackingResponse} from './correios.types';
import {PacketHistory} from 'src/app/packet/entities/packet-history.entity';
import moment from 'moment';

@Injectable()
export class CorreiosService {
  private readonly baseUrl =
    'https://api.linketrack.com/track/json?user=pedroni.dev@gmail.com&token=ce7beb0225a95a51c3559a433bd4c2fa6f2d5e48931c24a24fe417b6102882ac';
  private readonly axiosInstance = axios.create();

  async fetchHistory(code: string): Promise<PacketHistory[]> {
    const {data} = await this.axiosInstance.get<TrackingResponse>(
      `${this.baseUrl}&codigo=${code}`
    );

    return data.eventos.map(event => ({
      date: moment(
        `${event.data} ${event.hora}`,
        'DD/MM/YYYY HH:mm:ss'
      ).toDate(),
      location: event.local,
      status: event.status,
    }));
  }
}
