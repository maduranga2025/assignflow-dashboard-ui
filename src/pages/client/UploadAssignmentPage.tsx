
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  UploadCloud,
  File,
  FileText,
  Image as ImageIcon,
  X,
  Mic,
  FileQuestion,
  Calendar,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

type FileWithPreview = {
  file: File;
  preview?: string;
  type: 'document' | 'image' | 'audio' | 'other';
};

const UploadAssignmentPage = () => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [level, setLevel] = useState('undergraduate');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles = Array.from(e.target.files).map(file => {
      const fileType = getFileType(file);
      
      // Create preview URL for images
      let preview;
      if (fileType === 'image') {
        preview = URL.createObjectURL(file);
      }
      
      return {
        file,
        preview,
        type: fileType
      };
    });
    
    setFiles([...files, ...newFiles]);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileType = (file: File): 'document' | 'image' | 'audio' | 'other' => {
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) {
      return 'document';
    } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return 'image';
    } else if (['mp3', 'wav', 'ogg', 'm4a'].includes(extension)) {
      return 'audio';
    } else {
      return 'other';
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    
    // Revoke object URL if it exists to prevent memory leaks
    if (updatedFiles[index].preview) {
      URL.revokeObjectURL(updatedFiles[index].preview);
    }
    
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !subject || !description || !deadline) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // This would be an API call in a real application
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Assignment uploaded successfully!');
      navigate('/assignments');
    } catch (error) {
      toast.error('Failed to upload assignment.');
      console.error('Upload error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFileIcon = (type: string, extension?: string) => {
    switch (type) {
      case 'document':
        return <FileText size={24} className="text-blue-500" />;
      case 'image':
        return <ImageIcon size={24} className="text-green-500" />;
      case 'audio':
        return <Mic size={24} className="text-purple-500" />;
      default:
        return <FileQuestion size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="container max-w-4xl py-6 animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight mb-6">Upload New Assignment</h1>
      
      <Card className="border-border shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>Assignment Details</CardTitle>
          <CardDescription>
            Provide information about your assignment to get the best help possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="upload-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Assignment Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    placeholder="e.g., Research Paper on Climate Change"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Environmental Science"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="level">Academic Level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select academic level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="masters">Masters</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input
                      id="deadline"
                      type="date"
                      className="pl-10"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Assignment Description <span className="text-red-500">*</span></Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed instructions for your assignment..."
                  className="min-h-32"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>
          
          <div className="mt-8">
            <Label>Upload Files</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Upload assignment materials, assignment instructions, or related resources
            </p>
            
            <Tabs defaultValue="documents">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="audio">Voice Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="documents">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <UploadCloud size={36} className="text-muted-foreground mb-2" />
                    <h3 className="font-medium mb-1">Upload Documents</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop or click to upload PDF, DOCX, or TXT files
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt,.rtf"
                      multiple
                      onChange={handleFileChange}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud size={16} className="mr-2" />
                      Select Files
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="images">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <ImageIcon size={36} className="text-muted-foreground mb-2" />
                    <h3 className="font-medium mb-1">Upload Images</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop or click to upload JPG, PNG, or GIF files
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud size={16} className="mr-2" />
                      Select Images
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="audio">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-center">
                    <Mic size={36} className="text-muted-foreground mb-2" />
                    <h3 className="font-medium mb-1">Upload Voice Notes</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop or click to upload MP3, WAV, or M4A files
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="audio/*"
                      multiple
                      onChange={handleFileChange}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <UploadCloud size={16} className="mr-2" />
                      Select Audio
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Uploaded Files ({files.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {files.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between border border-border rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      {file.type === 'image' && file.preview ? (
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                          <img src={file.preview} alt={file.file.name} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                          {getFileIcon(file.type, file.file.name.split('.').pop())}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="font-medium text-sm truncate">{file.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            form="upload-form" 
            size="lg" 
            className="w-full md:w-auto ml-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                Uploading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Check size={16} />
                Submit Assignment
              </span>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UploadAssignmentPage;
