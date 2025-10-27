import React, { useState } from "react";
import { AuthSwitch } from "./auth-switch";
import { Card } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import {
  Sparkles,
  Users,
  Wrench,
  Shield,
  CheckCircle,
  RefreshCw
} from "lucide-react";

export default function Demo() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [lastAction, setLastAction] = useState<string>("");

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setLastAction(`Выбрана роль: ${role}`);
  };

  const resetDemo = () => {
    setSelectedRole(null);
    setLastAction("Демо сброшено");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
              Демо компонент
            </Badge>
          </div>
          <h1 className="text-4xl font-bold text-white">
            Auth Switch Component
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Интерактивный компонент выбора роли с анимациями и формой входа
          </p>
        </div>

        {/* Component Demo */}
        <Card className="bg-slate-800/50 border-slate-700">
          <div className="p-6">
            <AuthSwitch
              onRoleSelect={handleRoleSelect}
              className="bg-white dark:bg-slate-900 rounded-lg"
            />
          </div>
        </Card>

        {/* Status Panel */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Выбранная роль</h3>
            </div>
            <div className="space-y-2">
              {selectedRole ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 capitalize">{selectedRole}</span>
                </div>
              ) : (
                <p className="text-slate-400">Не выбрана</p>
              )}
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Статус</h3>
            </div>
            <div className="space-y-2">
              <p className="text-slate-300">{lastAction || "Готов к использованию"}</p>
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Действия</h3>
            </div>
            <div className="space-y-2">
              <Button
                onClick={resetDemo}
                variant="outline"
                className="w-full border-slate-600 hover:bg-slate-800"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Сбросить
              </Button>
            </div>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              title: "Выбор роли",
              description: "3 роли: клиент, мастер, администратор"
            },
            {
              icon: <CheckCircle className="w-6 h-6" />,
              title: "Интерактивность",
              description: "Анимации и hover эффекты"
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: "Framer Motion",
              description: "Плавные переходы и анимации"
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Форма входа",
              description: "Email, пароль, показ/скрытие пароля"
            }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Usage Example */}
        <Card className="bg-slate-900 border-slate-700">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Пример использования
            </h3>
            <div className="bg-slate-800 rounded-lg p-4">
              <pre className="text-slate-300 text-sm overflow-x-auto">
{`import { AuthSwitch } from "@/components/ui/auth-switch";

<AuthSwitch
  onRoleSelect={(role) => {
    console.log('Selected role:', role);
    // Здесь логика входа
  }}
  className="custom-styles"
/>

// Интерфейс компонента:
interface AuthSwitchProps {
  onRoleSelect?: (role: string) => void;
  className?: string;
}`}
              </pre>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
