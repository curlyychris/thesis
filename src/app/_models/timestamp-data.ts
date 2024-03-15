import { Time } from "@angular/common";

export interface SensorTimestampedData
{
    timestamp: Time;
    sensorValue: number | null;
}