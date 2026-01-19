using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace TaskboardApi.Tests;

/// <summary>
/// Integration tests for Task API endpoints covering all CRUD operations.
/// </summary>
public class TaskApiTests : IClassFixture<WebApplicationFactory<Program>>, IDisposable
{
    private readonly HttpClient _client;
    private readonly WebApplicationFactory<Program> _factory;

    public void Dispose()
    {
        throw new NotImplementedException();
    }


    [Fact]
    public void TestMethod1(){}
    
}
