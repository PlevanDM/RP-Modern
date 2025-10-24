import {
  LegalAgreement,
  UserVerification,
  DisputeCase,
  FraudReport,
  UserActivity,
  AgreementStatus,
  VerificationStatus,
  DisputeStatus,
  FraudRiskLevel,
  ComplianceSnapshot,
} from '../types';

class ComplianceService {
  private static instance: ComplianceService;
  private agreements: LegalAgreement[] = [];
  private verifications: UserVerification[] = [];
  private disputes: DisputeCase[] = [];
  private fraudReports: FraudReport[] = [];
  private userActivity: UserActivity[] = [];
  private complianceSnapshots: ComplianceSnapshot[] = [];

  // Соглашения версии
  private agreementVersions = {
    terms_of_service: '1.0',
    privacy_policy: '1.0',
    service_agreement: '1.0',
    commission_agreement: '1.0',
    dispute_resolution: '1.0',
  };

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): ComplianceService {
    if (!ComplianceService.instance) {
      ComplianceService.instance = new ComplianceService();
    }
    return ComplianceService.instance;
  }

  /**
   * Требовать подписание соглашения
   */
  public requireAgreement(
    userId: string,
    agreementType: any,
    ipAddress: string,
    userAgent: string
  ): LegalAgreement {
    const agreement: LegalAgreement = {
      id: `agreement-${Date.now()}`,
      userId,
      type: agreementType,
      version: this.agreementVersions[agreementType as keyof typeof this.agreementVersions] || '1.0',
      status: 'not_agreed',
      ipAddress,
      userAgent,
    };

    this.agreements.push(agreement);
    this.saveToStorage();
    return agreement;
  }

  /**
   * Согласиться с соглашением
   */
  public agreeToAgreement(
    userId: string,
    agreementType: any,
    signature?: string
  ): boolean {
    const agreement = this.agreements.find(
      (a) => a.userId === userId && a.type === agreementType && a.status === 'not_agreed'
    );

    if (agreement) {
      agreement.status = 'agreed';
      agreement.agreedAt = new Date();
      agreement.signature = signature;

      // Соглашения действительны 2 года
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 2);
      agreement.expiresAt = expiryDate;

      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Проверить, согласился ли пользователь со всеми необходимыми соглашениями
   */
  public hasAllAgreements(userId: string): boolean {
    const requiredAgreements = ['terms_of_service', 'privacy_policy', 'commission_agreement'];
    return requiredAgreements.every((type) => {
      const agreement = this.agreements.find(
        (a) =>
          a.userId === userId &&
          a.type === (type as any) &&
          a.status === 'agreed' &&
          (!a.expiresAt || a.expiresAt > new Date())
      );
      return !!agreement;
    });
  }

  /**
   * Создать запрос на верификацию
   */
  public startVerification(
    userId: string,
    verificationType: any
  ): UserVerification {
    const verification: UserVerification = {
      id: `verification-${Date.now()}`,
      userId,
      status: 'pending',
      verificationType,
      attemptsCount: 0,
    };

    this.verifications.push(verification);
    this.saveToStorage();
    return verification;
  }

  /**
   * Подтвердить верификацию
   */
  public confirmVerification(
    verificationId: string,
    documentType?: string,
    documentNumber?: string,
    documentExpiryDate?: Date
  ): boolean {
    const verification = this.verifications.find((v) => v.id === verificationId);
    if (verification) {
      verification.status = 'verified';
      verification.verifiedAt = new Date();
      verification.documentType = documentType as any;
      verification.documentNumber = documentNumber;
      verification.documentExpiryDate = documentExpiryDate;

      // Верификация действительна 1 год
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      verification.expiresAt = expiryDate;

      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Отклонить верификацию
   */
  public rejectVerification(
    verificationId: string,
    reason: string
  ): boolean {
    const verification = this.verifications.find((v) => v.id === verificationId);
    if (verification) {
      verification.status = 'rejected';
      verification.rejectionReason = reason;
      verification.attemptsCount++;

      // Если 3 попытки неудачны - заморозить аккаунт
      if (verification.attemptsCount >= 3) {
        verification.status = 'suspended';
      }

      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Получить статус верификации пользователя
   */
  public getUserVerificationStatus(userId: string): Record<string, VerificationStatus> {
    const userVerifications = this.verifications.filter((v) => v.userId === userId);
    const status: Record<string, VerificationStatus> = {};

    userVerifications.forEach((v) => {
      status[v.verificationType] = v.status;
    });

    return status;
  }

  /**
   * Создать спор (dispute case)
   */
  public createDispute(
    orderId: string,
    clientId: string,
    masterId: string,
    initiatedBy: string,
    title: string,
    description: string,
    reason: any,
    amount: number
  ): DisputeCase {
    const dispute: DisputeCase = {
      id: `dispute-${Date.now()}`,
      orderId,
      clientId,
      masterId,
      initiatedBy,
      title,
      description,
      evidence: [],
      status: 'open',
      reason,
      requestedResolution: 'refund',
      amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      appealCount: 0,
    };

    this.disputes.push(dispute);
    this.saveToStorage();
    return dispute;
  }

  /**
   * Добавить доказательство в спор
   */
  public addDisputeEvidence(
    disputeId: string,
    type: any,
    url: string,
    uploadedBy: string,
    description: string,
    fileName?: string
  ): boolean {
    const dispute = this.disputes.find((d) => d.id === disputeId);
    if (dispute && dispute.status !== 'resolved') {
      dispute.evidence.push({
        id: `evidence-${Date.now()}`,
        type,
        url,
        fileName,
        description,
        uploadedBy,
        uploadedAt: new Date(),
      });

      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Разрешить спор (для модератора)
   */
  public resolveDispute(
    disputeId: string,
    moderatorId: string,
    resolution: string,
    actionDescription: string
  ): boolean {
    const dispute = this.disputes.find((d) => d.id === disputeId);
    if (dispute) {
      dispute.status = 'resolved';
      dispute.resolution = actionDescription;
      dispute.resolutionBy = moderatorId;
      dispute.resolvedAt = new Date();

      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Подать апелляцию по спору
   */
  public appealsDispute(disputeId: string): boolean {
    const dispute = this.disputes.find((d) => d.id === disputeId);
    if (dispute && dispute.status === 'resolved' && dispute.appealCount < 2) {
      dispute.appealCount++;
      dispute.status = 'appealed';
      dispute.appealDeadline = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 дней
      dispute.updatedAt = new Date();

      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Получить все споры пользователя
   */
  public getUserDisputes(userId: string): DisputeCase[] {
    return this.disputes.filter(
      (d) => d.clientId === userId || d.masterId === userId
    );
  }

  /**
   * Сообщить о мошенничестве
   */
  public reportFraud(
    reportedBy: string,
    targetUserId: string,
    type: any,
    description: string,
    evidence: string[],
    orderId?: string
  ): FraudReport {
    const aiScore = this.calculateFraudScore(type, description, evidence);
    const riskLevel = this.getRiskLevel(aiScore);

    const report: FraudReport = {
      id: `fraud-${Date.now()}`,
      reportedBy,
      targetUserId,
      orderId,
      type,
      description,
      evidence,
      riskLevel,
      status: 'new',
      createdAt: new Date(),
      aiScore,
    };

    this.fraudReports.push(report);

    // Если критический риск - немедленное действие
    if (riskLevel === 'critical') {
      report.status = 'investigating';
      report.investigatedAt = new Date();
    }

    this.saveToStorage();
    return report;
  }

  /**
   * Получить отчет о мошенничестве
   */
  public getUserFraudReport(userId: string): FraudReport[] {
    return this.fraudReports.filter((r) => r.targetUserId === userId);
  }

  /**
   * Расследовать мошенничество
   */
  public investigateFraud(
    fraudId: string,
    investigatorId: string,
    actionTaken: string,
    confirmed: boolean
  ): boolean {
    const fraud = this.fraudReports.find((f) => f.id === fraudId);
    if (fraud) {
      fraud.status = confirmed ? 'confirmed' : 'rejected';
      fraud.investigatedAt = new Date();
      fraud.investigatedBy = investigatorId;
      fraud.actionTaken = actionTaken;

      this.saveToStorage();
      return true;
    }
    return false;
  }

  /**
   * Записать активность пользователя
   */
  public logUserActivity(
    userId: string,
    action: any,
    details: Record<string, any>,
    ipAddress: string,
    userAgent: string
  ): UserActivity {
    const riskFlags = this.analyzeActivity(userId, action, ipAddress);

    const activity: UserActivity = {
      id: `activity-${Date.now()}`,
      userId,
      action,
      details,
      ipAddress,
      userAgent,
      timestamp: new Date(),
      riskFlags,
    };

    this.userActivity.push(activity);
    this.saveToStorage();

    return activity;
  }

  /**
   * Получить снимок соответствия пользователя
   */
  public getComplianceSnapshot(userId: string): ComplianceSnapshot {
    const verifications = this.verifications.filter((v) => v.userId === userId);
    const agreements = this.agreements.filter((a) => a.userId === userId && a.status === 'agreed');
    const fraudReports = this.fraudReports.filter((f) => f.targetUserId === userId);
    const recentActivity = this.userActivity
      .filter((a) => a.userId === userId)
      .slice(-20);

    const verificationsStatus: Record<string, VerificationStatus> = {};
    verifications.forEach((v) => {
      verificationsStatus[v.verificationType] = v.status;
    });

    const agreementsStatus: Record<string, AgreementStatus> = {};
    agreements.forEach((a) => {
      agreementsStatus[a.type] = a.status;
    });

    let riskLevel: FraudRiskLevel = 'low';
    let flagsCount = 0;

    // Анализ риска
    fraudReports.forEach((r) => {
      if (r.status === 'confirmed') {
        riskLevel = 'critical';
        flagsCount += 10;
      } else if (r.riskLevel === 'high') {
        if (riskLevel === 'low') riskLevel = 'high';
        flagsCount += 5;
      }
    });

    recentActivity.forEach((a) => {
      if (a.riskFlags && a.riskFlags.length > 0) {
        flagsCount += a.riskFlags.length;
      }
    });

    const complianceScore = Math.max(0, 100 - flagsCount * 5);

    const snapshot: ComplianceSnapshot = {
      id: `snapshot-${Date.now()}`,
      userId,
      timestamp: new Date(),
      verificationsStatus,
      agreementsStatus,
      riskLevel,
      flagsCount,
      complianceScore,
    };

    this.complianceSnapshots.push(snapshot);
    this.saveToStorage();

    return snapshot;
  }

  /**
   * Приватные методы
   */

  private calculateFraudScore(type: string, description: string, evidence: string[]): number {
    let score = 0;

    // Базовый риск по типу
    const typeScores: Record<string, number> = {
      account_activity: 20,
      fake_order: 40,
      payment_fraud: 50,
      identity_fraud: 80,
      abuse: 30,
      other: 10,
    };

    score += typeScores[type] || 10;

    // Дополнительные баллы за длину описания
    if (description.length > 100) score += 10;

    // Баллы за количество доказательств
    score += Math.min(evidence.length * 5, 20);

    return Math.min(score, 100);
  }

  private getRiskLevel(score: number): FraudRiskLevel {
    if (score >= 75) return 'critical';
    if (score >= 50) return 'high';
    if (score >= 25) return 'medium';
    return 'low';
  }

  private analyzeActivity(userId: string, action: string, ipAddress: string): string[] {
    const flags: string[] = [];

    // Проверить быстрые запросы
    const recentActivity = this.userActivity
      .filter((a) => a.userId === userId)
      .filter((a) => Date.now() - a.timestamp.getTime() < 60000); // За последнюю минуту

    if (recentActivity.length > 10) {
      flags.push('rapid_requests');
    }

    // Проверить смену IP
    const previousActivities = this.userActivity.filter(
      (a) => a.userId === userId && a.ipAddress !== ipAddress
    );
    if (previousActivities.length > 0) {
      flags.push('ip_changed');
    }

    // Проверить действие при отсутствии верификации
    const userVerifications = this.verifications.filter((v) => v.userId === userId);
    if (
      (action === 'payment' || action === 'order_created') &&
      userVerifications.length === 0
    ) {
      flags.push('unverified_action');
    }

    return flags;
  }

  private saveToStorage(): void {
    try {
      const data = {
        agreements: this.agreements,
        verifications: this.verifications,
        disputes: this.disputes,
        fraudReports: this.fraudReports,
        userActivity: this.userActivity,
        complianceSnapshots: this.complianceSnapshots,
      };
      localStorage.setItem('compliance-service-data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving compliance data to storage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('compliance-service-data');
      if (data) {
        const parsed = JSON.parse(data);
        this.agreements = parsed.agreements || [];
        this.verifications = parsed.verifications || [];
        this.disputes = parsed.disputes || [];
        this.fraudReports = parsed.fraudReports || [];
        this.userActivity = parsed.userActivity || [];
        this.complianceSnapshots = parsed.complianceSnapshots || [];
      }
    } catch (error) {
      console.error('Error loading compliance data from storage:', error);
    }
  }
}

export const complianceService = ComplianceService.getInstance();
