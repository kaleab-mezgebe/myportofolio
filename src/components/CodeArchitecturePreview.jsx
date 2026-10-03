import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Check, Copy, Sparkles, Terminal, FileCode2 } from 'lucide-react';

export const CodeArchitecturePreview = ({ onTriggerToast }) => {
    const [activeSnippet, setActiveSnippet] = useState('bloc');
    const [copied, setCopied] = useState(false);

    const snippets = {
        bloc: {
            title: 'ride_location_bloc.dart',
            lang: 'Dart / Flutter BLoC',
            code: `// Axumite Ride Real-Time Stream BLoC Handler
class RideTrackingBloc extends Bloc<RideTrackingEvent, RideTrackingState> {
  final SignalRHubService _signalRHub;
  StreamSubscription<DriverLocation>? _gpsSubscription;

  RideTrackingBloc({required SignalRHubService signalRHub})
      : _signalRHub = signalRHub,
        super(RideTrackingInitial()) {
    on<StartTrackingRide>(_onStartTracking);
    on<DriverLocationUpdated>(_onLocationUpdated);
    on<StopTrackingRide>(_onStopTracking);
  }

  Future<void> _onStartTracking(
    StartTrackingRide event,
    Emitter<RideTrackingState> emit,
  ) async {
    emit(RideTrackingLoading());
    try {
      await _signalRHub.connectToRideChannel(event.rideId);
      _gpsSubscription = _signalRHub.driverLocationStream.listen((location) {
        add(DriverLocationUpdated(location));
      });
      emit(RideTrackingActive(driverLocation: event.initialLocation));
    } catch (e, stackTrace) {
      emit(RideTrackingError(message: "Failed to connect to GPS stream"));
    }
  }

  void _onLocationUpdated(
    DriverLocationUpdated event,
    Emitter<RideTrackingState> emit,
  ) {
    emit(RideTrackingActive(
      driverLocation: event.location,
      lastPingTimestamp: DateTime.now(),
    ));
  }
}`
        },
        typescript: {
            title: 'shemeta_payment_client.ts',
            lang: 'TypeScript / Next.js',
            code: `// Shemeta Multi-Vendor Telebirr & Chapa Payment Gateway Handler
import axios, { AxiosInstance } from 'axios';

export interface PaymentInitiationRequest {
  orderId: string;
  vendorId: string;
  amountETB: number;
  provider: 'telebirr' | 'chapa';
  customerPhone?: string;
  returnUrl: string;
}

export interface PaymentInitiationResponse {
  success: boolean;
  checkoutUrl: string;
  transactionRef: string;
  signature: string;
}

export class FinTechPaymentService {
  private apiClient: AxiosInstance;

  constructor(private readonly apiKey: string) {
    this.apiClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_PAYMENT_API_URL,
      timeout: 8000,
      headers: { 'X-Signature-Key': this.apiKey },
    });
  }

  async initiateCheckout(
    payload: PaymentInitiationRequest
  ): Promise<PaymentInitiationResponse> {
    const { data } = await this.apiClient.post<PaymentInitiationResponse>(
      '/api/v1/payments/initialize',
      payload
    );
    return data;
  }
}`
        },
        fastapi: {
            title: 'ocr_document_pipeline.py',
            lang: 'Python / FastAPI & OpenCV',
            code: `# Financial Document & Receipt Data Extraction Pipeline
from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel, Field
import cv2
import numpy as np
import pytesseract

app = FastAPI(title="Financial Receipt OCR Pipeline")

class ExtractedReceipt(BaseModel):
    merchant_name: str
    total_amount: float
    currency: str = "ETB"
    tax_amount: float | None = None
    transaction_id: str | None = None
    confidence_score: float = Field(ge=0.0, le=1.0)

@app.post("/api/v1/extract-receipt", response_model=ExtractedReceipt)
async def extract_receipt(file: UploadFile = File(...)):
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 1. Grayscale & Adaptive Otsu Binarization
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    binarized = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
    )

    # 2. Tesseract OCR with Structured Character Extraction
    ocr_data = pytesseract.image_to_data(binarized, output_type=pytesseract.Output.DICT)
    
    # 3. Schema Parsing & Confidence Calculation
    parsed = parse_financial_entities(ocr_data)
    return ExtractedReceipt(**parsed)`
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(snippets[activeSnippet].code);
        setCopied(true);
        onTriggerToast?.('Code snippet copied to clipboard! 📋');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="code-standards" style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-header">
                <div style={{ marginBottom: '14px' }}>
                    <span className="status-pill" style={{ color: 'var(--accent-primary)', borderColor: 'rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.08)' }}>
                        <FileCode2 size={14} /> // 04. PRODUCTION CODE INSPECTION
                    </span>
                </div>
                <h2 className="accent-text" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.03em' }}>
                    Architectural Code Samples
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
                    Real architectural snippets showcasing decoupled state management, strict type interfaces, and high-performance async pipelines.
                </p>
                <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))', margin: '24px auto 0', borderRadius: '4px' }} />
            </div>

            <div className="glass-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                {/* Code Window Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-terminal)', padding: '12px 18px', borderBottom: '1px solid var(--glass-border)', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {[
                            { id: 'bloc', label: 'ride_location_bloc.dart', lang: 'Flutter / BLoC' },
                            { id: 'typescript', label: 'shemeta_payment_client.ts', lang: 'TypeScript' },
                            { id: 'fastapi', label: 'ocr_document_pipeline.py', lang: 'FastAPI / Python' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSnippet(item.id)}
                                className={`terminal-tab-btn ${activeSnippet === item.id ? 'active' : ''}`}
                                style={{ fontSize: '0.80rem', padding: '4px 10px' }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleCopy}
                        className="tech-chip font-mono"
                        style={{ cursor: 'pointer', padding: '5px 12px', fontSize: '0.78rem' }}
                    >
                        {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                </div>

                {/* Code Viewer */}
                <div style={{ background: 'var(--bg-terminal)', padding: '18px', overflowX: 'auto' }}>
                    <pre
                        className="font-mono"
                        style={{
                            margin: 0,
                            fontSize: '0.84rem',
                            lineHeight: 1.6,
                            color: '#cbd5e1'
                        }}
                    >
                        {snippets[activeSnippet].code}
                    </pre>
                </div>
            </div>
        </section>
    );
};
