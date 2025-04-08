import GoldChartECharts from '@/components/charts/candlestick';
import { FullSizeCentered } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';



function Welcome() {
  const isPortrait = useOrientation();


  return (
    <>
      <meta name="title" content="Welcome" />
      <FullSizeCentered flexDirection={isPortrait ? 'column' : 'row'}>

        <GoldChartECharts />
      </FullSizeCentered>
    </>
  );
}

export default Welcome;
