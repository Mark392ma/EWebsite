import { useState } from "react";
import { useListReminders, useCreateReminder, getListRemindersQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Bell, Plus, Send, Users, Clock } from "lucide-react";

export default function Reminders() {
  const { data: reminders = [], isLoading } = useListReminders();
  const createReminder = useCreateReminder();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    message: "",
    channel: "sms" as "sms" | "email" | "app",
    targetGroup: "pending" as "all" | "overdue" | "pending",
    scheduledAt: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReminder.mutateAsync({
        title: form.title,
        message: form.message,
        channel: form.channel,
        targetGroup: form.targetGroup,
        scheduledAt: form.scheduledAt || null,
      });
      await queryClient.invalidateQueries({ queryKey: getListRemindersQueryKey() });
      toast({ title: "Reminder sent successfully" });
      setOpen(false);
      setForm({ title: "", message: "", channel: "sms", targetGroup: "pending", scheduledAt: "" });
    } catch {
      toast({ title: "Failed to send reminder", variant: "destructive" });
    }
  };

  const channelColor = (channel: string) => {
    if (channel === "sms") return "bg-green-100 text-green-800";
    if (channel === "email") return "bg-blue-100 text-blue-800";
    return "bg-purple-100 text-purple-800";
  };

  const statusColor = (status: string) => {
    if (status === "sent") return "bg-emerald-100 text-emerald-800";
    if (status === "failed") return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fee Reminders</h1>
          <p className="text-slate-500 text-sm mt-1">Send reminders to students with outstanding fees</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-700 hover:bg-teal-800 text-white">
              <Plus className="h-4 w-4 mr-2" /> Send Reminder
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Send Fee Reminder</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Term 1 Fee Reminder" required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Dear parent, this is a reminder..." rows={4} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Channel</Label>
                  <Select value={form.channel} onValueChange={v => setForm(f => ({ ...f, channel: v as "sms" | "email" | "app" }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="app">App Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Target</Label>
                  <Select value={form.targetGroup} onValueChange={v => setForm(f => ({ ...f, targetGroup: v as "all" | "overdue" | "pending" }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Active Students</SelectItem>
                      <SelectItem value="pending">Pending Fees</SelectItem>
                      <SelectItem value="overdue">Overdue Fees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="scheduledAt">Schedule At (optional)</Label>
                <Input id="scheduledAt" type="datetime-local" value={form.scheduledAt} onChange={e => setForm(f => ({ ...f, scheduledAt: e.target.value }))} />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createReminder.isPending} className="bg-teal-700 hover:bg-teal-800 text-white">
                  <Send className="h-4 w-4 mr-2" /> {createReminder.isPending ? "Sending..." : "Send Reminder"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-lg animate-pulse" />)}
        </div>
      ) : reminders.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No reminders sent yet</p>
            <p className="text-slate-400 text-sm mt-1">Send your first reminder to notify students about outstanding fees</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {reminders.map(reminder => (
            <Card key={reminder.id} className="border border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-slate-900">{reminder.title}</h3>
                      <Badge className={channelColor(reminder.channel)}>{reminder.channel.toUpperCase()}</Badge>
                      <Badge className={statusColor(reminder.status)}>{reminder.status}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{reminder.message}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {reminder.recipientCount} recipients
                      </span>
                      {reminder.sentAt && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Sent {new Date(reminder.sentAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
