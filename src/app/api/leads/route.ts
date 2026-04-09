import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validar datos básicos
    const { name, email, phone, styleResult, landStatus } = body;
    
    if (!name || !email) {
      return NextResponse.json({ error: 'Faltan datos obligatorios' }, { status: 400 });
    }

    // Configurar autenticación con Google
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Importante para que el salto de línea funcione en .env
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID as string, serviceAccountAuth);

    // Cargar información del documento
    await doc.loadInfo(); 
    const sheet = doc.sheetsByIndex[0]; // Selecciona la primera pestaña (Hoja 1)

    // Agrega la fila con la fecha actual y los datos del formulario
    await sheet.addRow({
      'Fecha': new Date().toLocaleString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' }),
      'Nombre': name,
      'Email': email,
      'Teléfono': phone || 'No proporcionado',
      'Resultado Estilo': styleResult,
      '¿Tiene Terreno?': landStatus || 'No especificado',
      'Origen': 'Test de Estilo (Web)'
    });

    return NextResponse.json({ success: true, message: 'Lead guardado correctamente en Google Sheets' }, { status: 200 });

  } catch (error: any) {
    console.error('Error al guardar en Google Sheets:', error);
    return NextResponse.json({ error: 'Error interno del servidor', details: error.message }, { status: 500 });
  }
}
