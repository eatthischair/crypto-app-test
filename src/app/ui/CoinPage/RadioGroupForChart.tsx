import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const RadioGroupForChart = ({ setRadioSelect }) => {
  return (
    <div className="flex flex-shrink justify-center gap-2 w-full flex-nowrap p-4">
      <RadioGroup defaultValue="option-3">
        <span className="flex space-x-2 ">
          <RadioGroupItem
            value="option-1"
            id="option-1"
            onClick={() => setRadioSelect(1)}
          />
          <Label htmlFor="option-1">1d</Label>
        </span>
        <span className="flex space-x-2">
          <RadioGroupItem
            value="option-2"
            id="option-2"
            onClick={() => setRadioSelect(2)}
          />
          <Label htmlFor="option-2">7d</Label>
        </span>
        <span className="flex space-x-2">
          <RadioGroupItem
            value="option-3"
            id="option-3"
            onClick={() => setRadioSelect(3)}
          />
          <Label htmlFor="option-3">30d</Label>
        </span>
        <span className="flex space-x-2">
          <RadioGroupItem
            value="option-4"
            id="option-4"
            onClick={() => setRadioSelect(4)}
          />
          <Label htmlFor="option-4">90d</Label>
        </span>
        <span className="flex space-x-2">
          <RadioGroupItem
            value="option-5"
            id="option-5"
            onClick={() => setRadioSelect(5)}
          />
          <Label htmlFor="option-5">1y</Label>
        </span>
        <span className="flex space-x-2">
          <RadioGroupItem
            value="option-6"
            id="option-6"
            onClick={() => setRadioSelect(6)}
          />
          <Label htmlFor="option-6">Max</Label>
        </span>
      </RadioGroup>
    </div>
  );
};
