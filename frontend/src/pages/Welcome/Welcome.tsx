import GoldChartECharts from '@/components/charts/candlestick';
import { FullSizeCentered } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';
import { Box } from '@mui/material';



function Welcome() {
  const isPortrait = useOrientation();


  return (
    <>
      <meta name="title" content="Welcome" />

      <FullSizeCentered flexDirection={isPortrait ? 'column' : 'row'}>
        <Box flex={1}>
          <GoldChartECharts />
        </Box>

      </FullSizeCentered>
    </>
  );
}

export default Welcome;
