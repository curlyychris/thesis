import { Time } from "@angular/common";

export interface SensorTimestampedData
{
    timestamp: string;
    sensorValue: number | null;
}