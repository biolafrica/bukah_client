import { useMetricResource } from './useMetricResources'
import { useOrders } from './useOrder'
import { useTopStaff } from './useEmployee'
import { useTopSellingProducts } from './useTopSellingProduct'
import { useMetricTransformer } from './useMetricsTransformer'
import { transformTopSellingProducts } from '../lib/transformer'

export function useMetrics(){
  return useMetricResource({
    resourceKey: 'general-metrics',
    endpoint: '/api/common/metrics',
  })
}

export function useDashboard() {
  const metricQ   = useMetrics()
  const orderQ    = useOrders()
  const employeeQ = useTopStaff()
  const productQ = useTopSellingProducts()

  const { metrics, range, setRange } = useMetricTransformer(
    metricQ.data,
    { formatStrategy: "auto" }
  );

  return {
    metrics,
    range,
    setRange,
    items: orderQ.items ?? [],
    users: employeeQ.items ?? [],
    products: transformTopSellingProducts(productQ.data ?? []),
    loading: metricQ.isLoading || orderQ.isLoading || employeeQ.isLoading || productQ.isLoading,
    error: metricQ.error || orderQ.error || employeeQ.error || productQ.error,
  }
}
