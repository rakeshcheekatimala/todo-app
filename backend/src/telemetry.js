const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
const { MeterProvider, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { metrics } = require('@opentelemetry/api');

function setupTelemetry() {
  const resource = new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || 'todo-backend',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  });

  const traceExporter = new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  });

  const metricExporter = new OTLPMetricExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/metrics',
  });

  const sdk = new opentelemetry.NodeSDK({
    resource,
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
  });

  const meterProvider = new MeterProvider({
    resource,
  });

  const metricReader = new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 1000,
  });

  meterProvider.addMetricReader(metricReader);

  // Create custom metrics
  const meter = metrics.getMeter('todo-app-metrics');

  // Request duration histogram
  const requestCounter = meter.createCounter('todo_http_requests_total', {
  description: 'Total number of HTTP requests',
  attributes: ['method', 'path', 'status']
  });

  const requestDuration = meter.createHistogram('todo_http_duration_seconds', {
    description: 'Duration of HTTP requests in seconds',
    unit: 's',
    attributes: ['method', 'path']
  });

  const errorCounter = meter.createCounter('todo_http_errors_total', {
    description: 'Total number of HTTP errors',
    attributes: ['method', 'path', 'error_type']
  });

  const crudCounter = meter.createCounter('todo_crud_operations_total', {
    description: 'Total number of CRUD operations',
    attributes: ['operation', 'status']
  });

  // Active connections gauge
  const activeConnections = meter.createObservableGauge('active_connections', {
    description: 'Number of active connections',
  });

  // Export metrics
  metrics.setGlobalMeterProvider(meterProvider);

  // Initialize the SDK and register with the OpenTelemetry API
  try {
    sdk.start();
    console.log('Tracing initialized');
  } catch (error) {
    console.log('Error initializing tracing', error);
  }

  // Gracefully shut down the SDK on process exit
  process.on('SIGTERM', () => {
    sdk.shutdown()
      .then(() => console.log('Tracing terminated'))
      .catch((error) => console.log('Error terminating tracing', error))
      .finally(() => process.exit(0));
  });

  return {
    requestDuration,
    requestCounter,
    errorCounter,
    crudCounter,
    activeConnections,
  };
}

module.exports = { setupTelemetry }; 